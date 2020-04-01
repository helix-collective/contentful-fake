// Fix for module contentful-resolve-response, which has no default export.
//
declare module 'contentful-resolve-response' {
  import * as contentfulResolveResponse from 'contentful-resolve-response';
  // we have to name the export differently, otherwise we get
  // Cannot use namespace 'isUrl' as a value.
  const exported = contentfulResolveResponse;
  namespace exported {}
  export = exported;
}