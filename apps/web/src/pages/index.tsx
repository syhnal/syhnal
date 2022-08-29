// installed
import type { NextPage } from 'next'
import Link from 'next/link'
import groq from 'groq'

// shared
import { Brand, Category, Product, toBrandList, toCategoryList, toProductList, uniqueBrand } from 'logic'

// local
import { Banner, StockBrandList, Title, ProductList, CustomBrandList } from '../components'
import { urlFor, getClient, toLocale, GetStaticProps, ILangPack } from '../utils'
import Image from 'next/image'


interface IHomeProps {
  langPack: ILangPack
  novelty: Product[]
  brands: {
    stock: Brand[]
    order: Brand[]
  }
  categories: Category[]
}

const HomePage: NextPage<IHomeProps> = ({ langPack, brands, novelty, categories }) => {
  return (
    <div>
      <Title val='Сигнал' />

      <div className='container-xl'>
        <Link href={`/`} locale="ru">

          ru locale
        </Link>

        <Banner />

        <div className='mt-5'>
          <div className='row row-cols-1 row-cols-md-2 g-5'>
            <div className='pe-md-5'>
              <h2 className='mb-3'>{langPack.home.order}</h2>
              <StockBrandList items={brands.stock} />
            </div>
            <div className='ps-md-5'>
              <h2 className='mb-3'>{langPack.home.stock}</h2>
              <CustomBrandList items={brands.order} />
            </div>
          </div>

        </div>

        <div className='mt-5'>
          <h2 className='text-center mb-4'>{langPack.home.categories}</h2>
          <div className='row row-cols-2 row-cols-md-3 g-3 g-sm-4 g-md-5'>
            {categories.map(category =>
              <Link href={`/catalog/${category.slug}`} key={category.id}>
                <a className='col'>
                  <div >
                    {category.img ?
                      <Image src={urlFor(category.img).url()} className="card-img-top" width={900} height={600} />
                      : null}
                    <h5 className='card-title text-center'>{category.title}</h5>
                  </div>
                </a>
              </Link>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h2 className='mb-1'>Новинки</h2>
          <ProductList items={novelty} />
        </div>

        {/* Буде додано пізніше
        <Article className='mt-5'
          header='Як правильно купити запчастини?'
          paragraphs={[
            'Якщо вам необхідно купити запчастини моторної групи, ходової або ж до коробки передач, то тут радимо не гнатися за максимальною економією. Це пов`язано з тим, що у неоригінальних запчастин ресурс експлуатації менший, ніж в оригінальної запчастини. Якщо ж Вам необхідно замінити ручку від дверей, або фару, то в цьому випадку допустимо вдатися до економії',
            'Запчастини слід купувати тільки там, де на вашу покупку дадуть гарантію. А у разі виявлення браку буде кому виставити претензію.',
            'Завжди необхідно давати оцінку продавцеві, не важливо - це інтернет-магазин запчастин, або ж торговий кіоск на ринку. Перш за все, звертайте увагу на асортимент запчастин і професійну компетентність продавця або консультанта. Якщо ж у процесі підбору запчастин у Вас виникли будь-які сумніви, то варто відмовитися від покупки в цьому місці.',
            'Ви повинні розуміти, що у разі виникнення у продавця труднощів із підбору запчастин на ваш автомобіль за номером кузова (VIN-коду є велика ймовірність того, що куплена запчастини не підійде для вашого авто.',
            'Ви повинні розуміти, що у разі виникнення у продавця труднощів із підбору запчастин на ваш автомобіль за номером кузова (VIN-коду є велика ймовірність того, що куплена запчастини не підійде для вашого авто.',
            'Велику популярність в частині продажу запчастин отримали online-ресурси, серед них і наш - інтернет-магазин запчастин dok.ua Для наших клієнтів ми вирішили не тільки задачу в простій і зручній купівлі запчастин, а й подбали про їх оперативну доставку на всій території України. Користуючись сайтом інтернет-магазину ДОК, ви зможете підібрати потрібні вам запчастини того чи іншого виробника, виходячи з марки вашого автомобіля, його моделі, модифікації, року випуску і ціни, яку ви готові заплатити. dok.ua - це найбільш повноцінний каталог запчастин для іномарок, а також максимально зручний пошук як за артикулом запчастини, так і за її назвою та виробником. Нашими незаперечними перевагами є надання консультацій висококваліфікованих експертів, які завжди допоможуть у правильному підборі тієї чи іншої запчастини. Ціни на запчастини в інтернет-магазині набагато дешевші, ніж на автобазарі або ж на СТО. Крім цього, купуючи запчастини в dok.ua, ви спокійні за їх сумісність із Вашим автомобілем.',
          ]} /> */}
      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ locale = 'uk', preview = false }) => {
  const client = getClient(preview)
  const lang = toLocale(locale);

  const novelty = await client
    .fetch(groq`*[_type == 'product'] | order(_createdAt asc)[0...5]{..., brand->}`)
    .then<Product[]>(data => toProductList(data, lang))

  const stockBrands = await client
    .fetch(groq`*[_type == 'product']{...brand->}`)
    .then<Brand[]>(toBrandList)
    .then(brands => brands.filter(uniqueBrand))

  const orderBrands = await client
    .fetch(groq`*[_type == 'brand' && !(_id in ["${stockBrands.map(brand => brand.id).join('", "')}"])]`)
    .then<Brand[]>(toBrandList)

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(data => toCategoryList(data, lang))

  return {
    props: {
      langPack: {
        navigation: require(`../langs/navigation/${lang}.json`),
        home: require(`../langs/home/${lang}.json`),
        productList: require(`../langs/components/ProductList/${lang}.json`)
      },
      locale,
      novelty,
      brands: {
        stock: stockBrands,
        order: orderBrands
      },
      categories
    },
    revalidate: 10,
  }
}

export default HomePage
export { getStaticProps }