import type { NextPage } from 'next'
import { Article, Card } from 'ui'
import { Banner, BrandList, NavBar, Title } from '../components'
import { GetStaticProps } from 'next'
import { getClient } from '../utils/cms/sanity.server'
import groq from 'groq'
import { Brand, Category, Product, toBrandList, toCategory, toCategoryList, toProductList, uniqueBrand } from 'logic'
import { ProductList } from '../components/content/ProductList'
import Link from 'next/link'
import { urlFor } from '../utils/cms/sanity'
import { Viewed } from '../components/content/Viewed'

interface IHomeProps {
  novelty: Product[]
  brands: {
    stock: Brand[]
    order: Brand[]
  }
  popular: {
    categories: Category[]
    products: Product[]
  }
}

const HomePage: NextPage<IHomeProps> = ({ brands, novelty, popular }) => {
  return (
    <div>
      <Title val='Сигнал' />

      <div className='container-xl'>
        <Banner />

        <div className='my-5'>
          <h2 className='mb-3'>Новинки</h2>
          <ProductList items={novelty} />
        </div>

        <div className='my-5 row row-cols-1 row-cols-md-2 g-5'>
          <div className='col pe-md-5'>
            <h2 className='mb-3'>В наявності</h2>
            <BrandList link='/' items={brands.stock} />
          </div>
          <div className='col ps-md-5'>
            <h2 className='mb-3'>Під замовлення</h2>
            <BrandList link='/order' items={brands.order} />
          </div>
        </div>

        <div className='py-5'>
          <h2 className='mb-3'>Популярні товари</h2>
          <ProductList items={popular.products} />
        </div>

        <div className='py-5'>
          <h2>Популярні категорії</h2>
          <div className='row row-cols-2 row-cols-md-4'>
            {popular.categories.map(category =>
              <Link href={`/`} key={category.id}>
                <a className='col'>
                  <div className='card border-0'>
                    <img src={urlFor(category.img).url()} className="card-img-top" alt="" />
                    <h5 className='card-title text-center'>{category.title.ua}</h5>
                    {/* <div className='card-body'>
                      <h5 className='card-title text-center'>{category.title.ua}</h5>
                    </div> */}
                  </div>
                </a>
              </Link>
            )}
          </div>
        </div>

        <div>
          <h2 className='mb-3'>Ви переглядали</h2>
          <Viewed />
        </div>

        <Article className='my-5'
          header='Як правильно купити запчастини?'
          paragraphs={[
            'Якщо вам необхідно купити запчастини моторної групи, ходової або ж до коробки передач, то тут радимо не гнатися за максимальною економією. Це пов`язано з тим, що у неоригінальних запчастин ресурс експлуатації менший, ніж в оригінальної запчастини. Якщо ж Вам необхідно замінити ручку від дверей, або фару, то в цьому випадку допустимо вдатися до економії',
            'Запчастини слід купувати тільки там, де на вашу покупку дадуть гарантію. А у разі виявлення браку буде кому виставити претензію.',
            'Завжди необхідно давати оцінку продавцеві, не важливо - це інтернет-магазин запчастин, або ж торговий кіоск на ринку. Перш за все, звертайте увагу на асортимент запчастин і професійну компетентність продавця або консультанта. Якщо ж у процесі підбору запчастин у Вас виникли будь-які сумніви, то варто відмовитися від покупки в цьому місці.',
            'Ви повинні розуміти, що у разі виникнення у продавця труднощів із підбору запчастин на ваш автомобіль за номером кузова (VIN-коду є велика ймовірність того, що куплена запчастини не підійде для вашого авто.',
            'Ви повинні розуміти, що у разі виникнення у продавця труднощів із підбору запчастин на ваш автомобіль за номером кузова (VIN-коду є велика ймовірність того, що куплена запчастини не підійде для вашого авто.',
            'Велику популярність в частині продажу запчастин отримали online-ресурси, серед них і наш - інтернет-магазин запчастин dok.ua Для наших клієнтів ми вирішили не тільки задачу в простій і зручній купівлі запчастин, а й подбали про їх оперативну доставку на всій території України. Користуючись сайтом інтернет-магазину ДОК, ви зможете підібрати потрібні вам запчастини того чи іншого виробника, виходячи з марки вашого автомобіля, його моделі, модифікації, року випуску і ціни, яку ви готові заплатити. dok.ua - це найбільш повноцінний каталог запчастин для іномарок, а також максимально зручний пошук як за артикулом запчастини, так і за її назвою та виробником. Нашими незаперечними перевагами є надання консультацій висококваліфікованих експертів, які завжди допоможуть у правильному підборі тієї чи іншої запчастини. Ціни на запчастини в інтернет-магазині набагато дешевші, ніж на автобазарі або ж на СТО. Крім цього, купуючи запчастини в dok.ua, ви спокійні за їх сумісність із Вашим автомобілем.',
          ]} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const novelty = await client
    .fetch(groq`*[_type == 'product'] | order(_createdAt asc)[0...5]`)
    .then<Product[]>(toProductList)

  const stockBrands = await client
    .fetch(groq`*[_type == 'product']{...brand->}`)
    .then<Brand[]>(toBrandList)
    .then(brands => brands.filter(uniqueBrand))

  const orderBrands = await client
    .fetch(groq`*[_type == 'brand' && !(_id in ["${stockBrands.map(brand => brand.id).join('", "')}"])]`)
    .then<Brand[]>(toBrandList)

  const popularCategories = await client
    .fetch(groq`*[_type == 'category'] | order(orders asc)[0...10]`)
    .then<Category[]>(toCategoryList)

  const popularProducts = await client.fetch(groq`*[_type == 'product'] | order(orders asc)[0...10]`)
    .then<Product[]>(toProductList)

  return {
    props: {
      novelty,
      brands: {
        stock: stockBrands,
        order: orderBrands
      },
      popular: {
        categories: popularCategories,
        products: popularProducts
      }
    },
    revalidate: 10,
  }
}

export default HomePage
