const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  // Static paths
  const routes = ['', '/inventory', '/services', '/contact'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const res = await fetch(`${BACKEND_URL}/api/cars`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const cars = await res.json();
      const carUrls = cars.map((car) => ({
        url: `${SITE_URL}/inventory/${car._id}`,
        lastModified: new Date(car.updatedAt || car.createdAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
      return [...routes, ...carUrls];
    }
  } catch (err) {
    console.error('Error generating dynamic sitemap URLs:', err);
  }

  return routes;
}
