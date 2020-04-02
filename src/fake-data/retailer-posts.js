// Fetched from contentful using
//curl --include \
//     --request GET \
//     'https://preview.contentful.com/spaces/x74vyp9vlegq/entries?access_token=<access token>&content_type=partnerPortalPermission&fields.retailer.sys.id=6iQe1WiWTmcosWymmYqYwk&fields.type=post&include=3'

const posts = {
  sys: {
    type: 'Array',
  },
  total: 3,
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
        id: '3AAwLhkdNuWUOuKcUSCWc2',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'partnerPortalPermission',
          },
        },
        revision: 1,
        createdAt: '2018-04-18T07:57:22.031Z',
        updatedAt: '2018-04-18T07:57:22.874Z',
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
        type: 'post',
        retailer: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '6iQe1WiWTmcosWymmYqYwk',
          },
        },
        managedEntry: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '4M2wN9R23Cq4OwSMCQuSmA',
          },
        },
        updatedBy: 'barry@helixta.com.au',
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
        id: '1T3ws1Jdha8OqyiYeWM6eY',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'partnerPortalPermission',
          },
        },
        revision: 1,
        createdAt: '2018-04-18T07:56:08.760Z',
        updatedAt: '2018-04-18T07:56:09.956Z',
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
        type: 'post',
        retailer: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '6iQe1WiWTmcosWymmYqYwk',
          },
        },
        managedEntry: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '4V8C6CzG6QQG0yaGawkWcq',
          },
        },
        updatedBy: 'barry@helixta.com.au',
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
        id: '3q4j9wL9Q4e2MmMEgimKYE',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'partnerPortalPermission',
          },
        },
        revision: 1,
        createdAt: '2018-04-18T07:55:31.485Z',
        updatedAt: '2018-04-18T07:55:32.474Z',
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
        type: 'post',
        retailer: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '6iQe1WiWTmcosWymmYqYwk',
          },
        },
        managedEntry: {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: '4U3inyTEiAaQiKyyg6Mkco',
          },
        },
        updatedBy: 'barry@helixta.com.au',
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
          id: '2Nxkr4RJckmucm4wYeECUm',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'heroImageSet',
            },
          },
          revision: 1,
          createdAt: '2018-04-18T07:57:17.933Z',
          updatedAt: '2018-04-18T07:57:18.769Z',
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
          backendTitle: 'My test offer #3 ',
          master: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: '1qxqAKUd5uiY8gGuOiWgQm',
            },
          },
          description: 'My test offer #3 ',
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
          id: '4M2wN9R23Cq4OwSMCQuSmA',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'offer',
            },
          },
          revision: 1,
          createdAt: '2018-04-18T07:57:20.540Z',
          updatedAt: '2018-04-19T05:51:36.751Z',
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
          backendTitle: 'My test offer #3 ',
          title: 'My test offer #3 ',
          slug: 'my-test-offer-3',
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '2Nxkr4RJckmucm4wYeECUm',
            },
          },
          shortDescription: 'This is the promo',
          bodyCopy: 'This is more body',
          startAt: '2018-04-18T17:56',
          hideAt: '2018-05-01T12:00',
          showAt: '2018-04-18T17:56',
          stores: [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '60DFm3DfTU8AusW8uSIuIm',
              },
            },
          ],
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
          id: '4U3inyTEiAaQiKyyg6Mkco',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'event',
            },
          },
          revision: 0,
          createdAt: '2018-04-18T07:55:29.741Z',
          updatedAt: '2018-04-18T07:55:29.741Z',
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
          backendTitle: 'My Test Event #1',
          title: 'My Test Event #1',
          slug: 'my-test-event-#1',
          shortDescription: 'This is some promo that will help SEO',
          bodyCopy: 'This is the body',
          showAt: '2018-04-18T17:54',
          stores: [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '60DFm3DfTU8AusW8uSIuIm',
              },
            },
          ],
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
          id: '4V8C6CzG6QQG0yaGawkWcq',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'news',
            },
          },
          revision: 0,
          createdAt: '2018-04-18T07:56:07.118Z',
          updatedAt: '2018-04-18T07:56:07.118Z',
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
          backendTitle: 'My test news post #2',
          title: 'My test news post #2',
          slug: 'my-test-news-post-#2',
          shortDescription: 'This is the promo',
          bodyCopy: 'This is the body copy',
          showAt: '2018-04-18T17:55',
          hideAt: '2018-04-21T12:00',
          stores: [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '60DFm3DfTU8AusW8uSIuIm',
              },
            },
          ],
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
          id: '5JTDRSJsXe6MaemuweQqO6',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'centre',
            },
          },
          revision: 4,
          createdAt: '2018-02-03T13:08:03.000Z',
          updatedAt: '2018-03-20T22:58:27.988Z',
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
          backendTitle: 'Bondi Junction',
          title: 'Bondi Junction',
          slug: 'bondijunction',
          physicalAddress: '500 Oxford St',
          suburb: 'Bondi Junction',
          postcode: '2022',
          state: 'NSW',
          country: 'Australia',
          telephoneNumber: '(02) 9947 8000',
          emailAddress: 'bondijunction@scentregroup.com',
          status: 'Open',
          facebook: 'http://www.facebook.com/westfieldbondijunction',
          twitter: '',
          instagram: 'http://instagram.com/westfieldbondijunction',
          latitude: -33.891289,
          longitude: 151.250815,
          timeZone: 'Australia/Sydney',
          utilityBoxRetailerCategories: [
            {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: '2Sm0gfks5igM4UMKOAo2Ga',
              },
            },
          ],
          navigationMenu: [
            {
              items: [
                {
                  url: '/bondijunction/whats-happening',
                  label: "What's happening",
                },
                {
                  url: '/bondijunction/opening-hours',
                  label: 'Opening hours',
                },
              ],
              title: 'Plan',
            },
            {
              items: [
                {
                  url: '/bondijunction/browse-stores',
                  label: 'Browse Stores',
                },
              ],
              title: 'Shop',
            },
            {
              items: [
                {
                  url: '/bondijunction/movies',
                  label: 'Movies',
                },
              ],
              title: 'Entertainment',
            },
          ],
          parkingOccupancy: {
            '1': {
              '5': '0',
              '6': '1',
              '7': '5',
              '8': '13',
              '9': '33',
              '10': '57',
              '11': '68',
              '12': '75',
              '13': '78',
              '14': '78',
              '15': '74',
              '16': '64',
              '17': '46',
              '18': '27',
              '19': '16',
              '20': '13',
              '21': '8',
              '22': '5',
              '23': '3',
            },
            '2': {
              '5': '3',
              '6': '6',
              '7': '13',
              '8': '30',
              '9': '100',
              '10': '70',
              '11': '75',
              '12': '77',
              '13': '77',
              '14': '72',
              '15': '65',
              '16': '61',
              '17': '50',
              '18': '35',
              '19': '23',
              '20': '16',
              '21': '11',
              '22': '7',
              '23': '5',
            },
            '3': {
              '5': '4',
              '6': '8',
              '7': '13',
              '8': '30',
              '9': '100',
              '10': '68',
              '11': '73',
              '12': '75',
              '13': '74',
              '14': '69',
              '15': '62',
              '16': '58',
              '17': '48',
              '18': '36',
              '19': '26',
              '20': '19',
              '21': '13',
              '22': '8',
              '23': '6',
            },
            '4': {
              '5': '4',
              '6': '8',
              '7': '13',
              '8': '31',
              '9': '100',
              '10': '69',
              '11': '75',
              '12': '77',
              '13': '75',
              '14': '70',
              '15': '62',
              '16': '58',
              '17': '47',
              '18': '34',
              '19': '23',
              '20': '17',
              '21': '11',
              '22': '6',
              '23': '5',
            },
            '5': {
              '5': '3',
              '6': '8',
              '7': '12',
              '8': '30',
              '9': '100',
              '10': '70',
              '11': '75',
              '12': '78',
              '13': '78',
              '14': '74',
              '15': '66',
              '16': '64',
              '17': '58',
              '18': '58',
              '19': '55',
              '20': '45',
              '21': '22',
              '22': '10',
              '23': '6',
            },
            '6': {
              '5': '3',
              '6': '7',
              '7': '12',
              '8': '30',
              '9': '100',
              '10': '70',
              '11': '75',
              '12': '77',
              '13': '76',
              '14': '72',
              '15': '62',
              '16': '58',
              '17': '46',
              '18': '33',
              '19': '23',
              '20': '19',
              '21': '14',
              '22': '9',
              '23': '6',
            },
            '7': {
              '5': '0',
              '6': '3',
              '7': '11',
              '8': '26',
              '9': '90',
              '10': '69',
              '11': '78',
              '12': '83',
              '13': '84',
              '14': '83',
              '15': '79',
              '16': '69',
              '17': '48',
              '18': '29',
              '19': '21',
              '20': '19',
              '21': '15',
              '22': '9',
              '23': '6',
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
          id: '60DFm3DfTU8AusW8uSIuIm',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'store',
            },
          },
          revision: 0,
          createdAt: '2018-04-18T07:52:35.864Z',
          updatedAt: '2018-04-19T06:55:18.191Z',
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
          backendTitle: 'Test Retailer #2 Store',
          title: "Second Test Retailer's Store",
          heroImageSet: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6umvDYF5egYag2gWkuq80K',
            },
          },
          storeType: 'In-line',
          centre: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '5JTDRSJsXe6MaemuweQqO6',
            },
          },
          retailer: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: '6iQe1WiWTmcosWymmYqYwk',
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
          id: '6umvDYF5egYag2gWkuq80K',
          contentType: {
            sys: {
              type: 'Link',
              linkType: 'ContentType',
              id: 'heroImageSet',
            },
          },
          revision: 7,
          createdAt: '2018-03-20T23:20:17.294Z',
          updatedAt: '2018-04-05T03:31:46.397Z',
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
          backendTitle: 'Another test store',
          master: {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: 'ExrGmcrjiKqiIK4oyos8G',
            },
          },
          description: 'Another test store',
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
          id: '1qxqAKUd5uiY8gGuOiWgQm',
          revision: 1,
          createdAt: '2018-04-18T07:57:06.301Z',
          updatedAt: '2018-04-18T07:57:16.253Z',
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
          title: 'dog_large.jpg',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/1qxqAKUd5uiY8gGuOiWgQm/73a575d8c0d5239e2e401728208ac1cf/dog_large.jpg',
            details: {
              size: 75801,
              image: {
                width: 1280,
                height: 720,
              },
            },
            fileName: 'dog_large.jpg',
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
          description: null,
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
          id: 'ExrGmcrjiKqiIK4oyos8G',
          revision: 1,
          createdAt: '2018-03-20T23:20:09.581Z',
          updatedAt: '2018-03-20T23:20:15.558Z',
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
          title: 'dog_large.jpg',
          file: {
            url:
              '//images.ctfassets.net/x74vyp9vlegq/ExrGmcrjiKqiIK4oyos8G/ae7ee4c72a9e6af49b8cac7018bae863/dog_large.jpg',
            details: {
              size: 75801,
              image: {
                width: 1280,
                height: 720,
              },
            },
            fileName: 'dog_large.jpg',
            contentType: 'image/jpeg',
          },
        },
      },
    ],
  },
};

module.exports = posts;