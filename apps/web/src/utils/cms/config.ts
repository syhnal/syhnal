import { SanityProjectDetails } from "@sanity/image-url/lib/types/types";
import { ClientConfig } from "next-sanity";

const config: SanityProjectDetails = {
  dataset: 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
}

const clientConfig: ClientConfig = {
  ...config,
  apiVersion: '2022-08-15',
  useCdn: true
}

// export const config: SanityProjectDetails = {
//   dataset: 'production',
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   apiVersion: '2022-08-15',
//   useCdn: true
// }

export { config, clientConfig }