import dotenv from 'dotenv';
dotenv.config();
const API_URL = process.env.WP_URL;

// API Call
async function fetchAPI(query, { variables } = {}) {
	console.log(variables)
	const headers = { 'Content-Type': 'application/json' };
	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	});

	const json = await res.json();
	if (json.errors) {
		console.log(json.errors);
		throw new Error('Failed to fetch API');
	}

	console.log(json.data)
	return json.data;
}

// Pages
export async function getAllPagesWithSlugs() {
	const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
	return data?.pages;
}

// Pages
export async function getPageBySlug(slug) {
	const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `);
	return data?.page;
}

// Menu Query
export async function getPrimaryMenu() {
	const data = await fetchAPI(`
  {
    menus(where: {location: PRIMARY}) {
      nodes {
        menuItems {
          edges {
            node {
              path
              label
              connectedNode {
                node {
                  ... on Page {
                    isPostsPage
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `);
	return data?.menus?.nodes[0];
}