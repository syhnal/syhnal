import { SanityProjectDetails } from "@sanity/image-url/lib/types/types";
import { ClientConfig } from "next-sanity";

const sanityConfig: SanityProjectDetails = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
}

const sanityClientConfig: ClientConfig = {
  ...sanityConfig,
  apiVersion: '2022-08-15',
  useCdn: true
}

// export const config: SanityProjectDetails = {
//   dataset: 'production',
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   apiVersion: '2022-08-15',
//   useCdn: true
// }

export { sanityConfig, sanityClientConfig }