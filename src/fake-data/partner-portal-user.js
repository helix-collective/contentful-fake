// Fetched from contentful using
//curl --include \
//     --request GET \
//     'https://preview.contentful.com/spaces/x74vyp9vlegq/entries?access_token=<access token>&content_type=partnerPortalUser&sys.id=1L9yhwXpWYGsIQ8O8oCgKM&include=2'

const ppu = {
  sys: {
    type: 'Array',
  },
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      sys: {
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'x74vyp9vlegq',
          },
        },
        type: 'Entry',
        id: '1L9yhwXpWYGsIQ8O8oCgKM',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'partnerPortalUser',
          },
        },
        revision: 8,
        createdAt: '2018-02-20T07:01:36.834Z',
        updatedAt: '2018-04-24T04:37:54.879Z',
        environment: {
          sys: {
            id: 'master',
            type: 'Link',
            linkType: 'Environment',
          },
        },
        locale: 'en-AU',
      },
      fields: {
        email: 'barry@helixta.com.au',
        acceptedTermsConditions: true,
        retailers: [
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '2rbiWn5JQ0AqUe2c80Yw6Q',
            },
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: 'GxsfCPuew820mqaO8wqUU',
            },
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6zkRA40FGwuQk6yKOeEyaa',
            },
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6iQe1WiWTmcosWymmYqYwk',
            },
          },
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '1BjwIhZdze6mI0sWEKGcAW',
            },
          },
        ],
      },
    },
  ],
  includes: {
    Entry: [
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '1BjwIhZdze6mI0sWEKGcAW',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailer',
            },
          },
          revision: 2,
          createdAt: '2018-02-09T04:33:48.749Z',
          updatedAt: '2018-03-12T22:43:25.294Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'ALDI',
          title: 'ALDI',
          slug: 'aldi',
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '2TzgGqJCLYCoWuYo6E64Uo',
            },
          },
          retailerLogoSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '1ske0L7TCMK8mEoiOG4oWI',
            },
          },
          shortDescription: 'Aldi blablab',
          longDescription:
            'ALDI is synonymous with high quality and exceptional value. Our goal is to provide you with a full range of grocery products that are of the highest possible quality at our incredibly low prices. To put it simply, we’re offering you a smarter way to shop.',
          country: 'Australia',
          websiteAddress: 'www.aldi.com.au',
          services: ['Catering'],
          priceDescription: '$',
          facebook: 'www.facebook.com/aldi',
          instagram: 'www.instagram.com/aldi',
          legacyIdentifier: 223,
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '1ske0L7TCMK8mEoiOG4oWI',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailerLogoSet',
            },
          },
          revision: 2,
          createdAt: '2018-02-09T04:33:47.604Z',
          updatedAt: '2018-02-11T23:50:28.313Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'aldi-logo',
          coloured: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'S0EAEggeCk0kw0sOIYUy0',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '1vSnadm4wUi8iGmUIo2IM4',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailCategory',
            },
          },
          revision: 1,
          createdAt: '2018-02-19T23:11:09.344Z',
          updatedAt: '2018-02-19T23:11:31.004Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Designer and boutique',
          title: 'Designer and boutique',
          level: 1,
          shortDescription: 'Designer and boutique',
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '2TzgGqJCLYCoWuYo6E64Uo',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'heroImageSet',
            },
          },
          revision: 0,
          createdAt: '2018-03-05T23:35:55.866Z',
          updatedAt: '2018-03-22T22:44:21.970Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'ALDI',
          master: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'oFdT8wUOsKe0oSOmCkgka',
            },
          },
          description: 'ALDI',
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '2rbiWn5JQ0AqUe2c80Yw6Q',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailer',
            },
          },
          revision: 9,
          createdAt: '2018-02-20T07:00:45.737Z',
          updatedAt: '2018-04-11T05:01:07.390Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Test Retailer',
          title: 'Test Retailer',
          slug: 'test-retailer',
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6FfoQW2bAsEQg2sGSY0AIO',
            },
          },
          retailerLogoSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: 'XEDlLC0ZAkc48aigYyQWk',
            },
          },
          shortDescription: 'promotional desc',
          longDescription: 'This is a test retailer, sure, d, no',
          country: 'Australia',
          priceDescription: '$$$',
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '3vvK3N4WRyCiIC4oImgoQq',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailCategory',
            },
          },
          revision: 2,
          createdAt: '2018-02-19T23:11:09.755Z',
          updatedAt: '2018-03-28T08:01:39.915Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Luggage and travel accessories',
          title: 'Luggage and travel accessories',
          level: 1,
          shortDescription: 'Luggage and travel accessories',
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '3bsalgqMViqeCOMU08Owko',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '5SkCbJTzvGmkCeagW4YcuM',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailerLogoSet',
            },
          },
          revision: 1,
          createdAt: '2018-02-09T04:28:25.658Z',
          updatedAt: '2018-02-11T23:41:43.811Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'oporto-logo',
          coloured: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '3nZ12Yuvx6sES2wCuWYeiW',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '6FfoQW2bAsEQg2sGSY0AIO',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'heroImageSet',
            },
          },
          revision: 5,
          createdAt: '2018-03-15T06:12:52.821Z',
          updatedAt: '2018-04-11T05:01:01.782Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Test Retailer',
          master: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '3mumSg4wysS28ug2kysskW',
            },
          },
          description: 'Test Retailer',
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '6NiHwQxVEkUUWUukSISGCQ',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailerLogoSet',
            },
          },
          revision: 0,
          createdAt: '2018-02-09T04:25:26.736Z',
          updatedAt: '2018-02-09T04:25:26.736Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'coach-logo',
          coloured: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'UdxKrU3POgOEcAKm26KeM',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '6iQe1WiWTmcosWymmYqYwk',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailer',
            },
          },
          revision: 0,
          createdAt: '2018-04-18T07:51:39.992Z',
          updatedAt: '2018-04-19T06:56:22.632Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Test Retailer #2',
          title: 'A second test retailer',
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '7ri2dewGw8iKgWe2OsQA26',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '6zkRA40FGwuQk6yKOeEyaa',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailer',
            },
          },
          revision: 2,
          createdAt: '2018-02-09T04:25:27.583Z',
          updatedAt: '2018-02-21T03:58:23.707Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Coach',
          title: 'Coach',
          slug: 'coach',
          retailerLogoSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6NiHwQxVEkUUWUukSISGCQ',
            },
          },
          shortDescription: 'Coach',
          longDescription:
            'A global leader in handbags and accessories, Coach is a modern luxury brand with a rich and authentic American heritage. All over the world, the Coach name is synonymous with the unstudied chic of New York style. Now at Bondi with new shoe collections and in-store monogramming.',
          country: 'Australia',
          priceDescription: '$',
          retailCategories: [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '1vSnadm4wUi8iGmUIo2IM4',
              },
            },
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '3vvK3N4WRyCiIC4oImgoQq',
              },
            },
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: 'z6WoOFa6xEeWGYyeqaC6i',
              },
            },
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: 'HLMccrmkkmG6eMuESSCe',
              },
            },
          ],
          legacyIdentifier: 3427,
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: '7ri2dewGw8iKgWe2OsQA26',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'heroImageSet',
            },
          },
          revision: 1,
          createdAt: '2018-02-09T04:25:38.034Z',
          updatedAt: '2018-02-11T23:38:15.014Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'gazman-front-image',
          master: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '1xtmmML6ioA2a6SSS6wG08',
            },
          },
          description: 'gazman-front-image',
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: 'GxsfCPuew820mqaO8wqUU',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailer',
            },
          },
          revision: 2,
          createdAt: '2018-02-09T04:28:26.481Z',
          updatedAt: '2018-02-15T06:22:05.448Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Oporto',
          title: 'Oporto',
          slug: 'oporto',
          retailerLogoSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '5SkCbJTzvGmkCeagW4YcuM',
            },
          },
          shortDescription: 'Oporto',
          longDescription:
            'Oporto – Home of the Famous Bondi Burger™. With our Fresh-Not-Frozen, Grilled-Not-Fried chicken, burgers, wraps and rolls and a splash of that legendary sauce with irresistible force – you’ve Just Gotta Go Oporto for breakfast, lunch and dinner.',
          country: 'Australia',
          priceDescription: '$',
          legacyIdentifier: 2221,
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: 'HLMccrmkkmG6eMuESSCe',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailCategory',
            },
          },
          revision: 3,
          createdAt: '2018-02-19T23:11:23.308Z',
          updatedAt: '2018-03-29T04:54:38.901Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: "Women's fashion",
          title: "Women's fashion",
          parentCategory: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '4EiDyyRM2sAkcOWcGw6YAE',
            },
          },
          level: 2,
          shortDescription: "Women's fashion",
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: 'XEDlLC0ZAkc48aigYyQWk',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailerLogoSet',
            },
          },
          revision: 2,
          createdAt: '2018-04-04T02:49:43.126Z',
          updatedAt: '2018-04-11T05:01:05.455Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: 'Test Retailer',
          coloured: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '4rskQ4NYY0qsGGwSI4Wecg',
            },
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Entry',
          id: 'z6WoOFa6xEeWGYyeqaC6i',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'retailCategory',
            },
          },
          revision: 1,
          createdAt: '2018-02-19T23:11:20.827Z',
          updatedAt: '2018-02-19T23:12:41.243Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          backendTitle: "Men's fashion",
          title: "Men's fashion",
          parentCategory: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '4EiDyyRM2sAkcOWcGw6YAE',
            },
          },
          level: 2,
          shortDescription: "Men's fashion",
        },
      },
    ],
    Asset: [
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: '1xtmmML6ioA2a6SSS6wG08',
          revision: 1,
          createdAt: '2018-02-09T04:25:36.452Z',
          updatedAt: '2018-02-11T22:55:21.969Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'gazman-front-image',
          description: 'gazman',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/1xtmmML6ioA2a6SSS6wG08/e9e03ff32b815f9790ccc10334001c12/gazman-storefront-2880x864.jpg',
            details: {
              size: 901092,
              image: {
                width: 2880,
                height: 864,
              },
            },
            fileName: 'gazman-storefront-2880x864.jpg',
            contentType: 'image/jpg',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: '3mumSg4wysS28ug2kysskW',
          revision: 1,
          createdAt: '2018-03-15T06:12:48.355Z',
          updatedAt: '2018-03-20T04:32:16.164Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'rabbit.jpg',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/3mumSg4wysS28ug2kysskW/3d90e32acad2d6e579ef347f17ec67ce/7d1e097f-3877-4260-b923-44551668789a.jpg',
            details: {
              size: 517910,
              image: {
                width: 1209,
                height: 906,
              },
            },
            fileName: 'rabbit.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: '3nZ12Yuvx6sES2wCuWYeiW',
          revision: 1,
          createdAt: '2018-02-09T04:28:24.116Z',
          updatedAt: '2018-02-11T22:56:43.126Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'oporto-logo',
          description: 'oporto-logo',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/3nZ12Yuvx6sES2wCuWYeiW/aef0d3931ff3f12a9fab9b1c4128bedb/oporto-logo',
            details: {
              size: 72437,
              image: {
                width: 600,
                height: 600,
              },
            },
            fileName: 'oporto-logo',
            contentType: 'image/png',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: '4rskQ4NYY0qsGGwSI4Wecg',
          revision: 1,
          createdAt: '2018-04-04T02:49:33.957Z',
          updatedAt: '2018-04-04T02:49:42.307Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'Coffee-800x600.jpg',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/4rskQ4NYY0qsGGwSI4Wecg/c7584bd9f59d6b97df2373aa700e219b/Coffee-800x600.jpg',
            details: {
              size: 75634,
              image: {
                width: 800,
                height: 600,
              },
            },
            fileName: 'Coffee-800x600.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: 'S0EAEggeCk0kw0sOIYUy0',
          revision: 1,
          createdAt: '2018-02-09T04:33:46.068Z',
          updatedAt: '2018-02-11T22:59:43.029Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'aldi-logo',
          description: 'aldi-logo',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/S0EAEggeCk0kw0sOIYUy0/d115c56aa44b2a22f1464d3863d6de82/aldi-logo',
            details: {
              size: 43131,
              image: {
                width: 600,
                height: 600,
              },
            },
            fileName: 'aldi-logo',
            contentType: 'image/png',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: 'UdxKrU3POgOEcAKm26KeM',
          revision: 1,
          createdAt: '2018-02-09T04:25:25.263Z',
          updatedAt: '2018-02-11T22:59:44.811Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'coach-logo',
          description: 'coach-logo',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/UdxKrU3POgOEcAKm26KeM/4ccfa2f9d399ece8d3e183bcb0cb3991/coach-logo',
            details: {
              size: 21215,
              image: {
                width: 475,
                height: 182,
              },
            },
            fileName: 'coach-logo',
            contentType: 'image/png',
          },
        },
      },
      {
        sys: {
          space: {
            sys: {
              type: 'Link',
              linkType: 'Space',
              id: 'x74vyp9vlegq',
            },
          },
          type: 'Asset',
          id: 'oFdT8wUOsKe0oSOmCkgka',
          revision: 0,
          createdAt: '2018-03-09T03:43:57.265Z',
          updatedAt: '2018-03-09T03:44:04.924Z',
          environment: {
            sys: {
              id: 'master',
              type: 'Link',
              linkType: 'Environment',
            },
          },
          locale: 'en-AU',
        },
        fields: {
          title: 'Gluestore.jpg',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/oFdT8wUOsKe0oSOmCkgka/6383cd2292a34e96e8f40c16a6081e5d/Gluestore.jpg',
            details: {
              size: 148810,
              image: {
                width: 409,
                height: 304,
              },
            },
            fileName: 'Gluestore.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
    ],
  },
}

export default ppu
