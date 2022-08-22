import { createClient } from "next-sanity";
import { sanityClientConfig } from "./config";

const sanityClient = createClient(sanityClientConfig)

const previewClient = createClient({
  ...sanityClientConfig,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const getClient = (usePreview: boolean) => usePreview ? previewClient : sanityClient

export { sanityClient, previewClient, getClient }