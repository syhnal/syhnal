import { createClient } from "next-sanity";
import { clientConfig } from "./config";

const sanityClient = createClient(clientConfig)

const previewClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const getClient = (usePreview: boolean) => usePreview ? previewClient : sanityClient

export { sanityClient, previewClient, getClient }