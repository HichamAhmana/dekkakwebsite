"use server";

export async function getFlickrPhotos() {
  try {
    const res = await fetch(
      "https://api.flickr.com/services/feeds/photos_public.gne?id=119491183@N07&format=json&nojsoncallback=1",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Flickr feed");
    }
    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching Flickr photos:", error);
    return [];
  }
}
