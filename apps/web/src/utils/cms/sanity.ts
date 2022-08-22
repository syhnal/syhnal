import { createPreviewSubscriptionHook, createCurrentUserHook } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './config'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(sanityConfig).image(source)

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig)

export const useCurrentUser = createCurrentUserHook(sanityConfig)