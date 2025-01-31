import { useParams } from "react-router-dom";
import ImageCarousel from "./Carousel";
import NameComponent from "./NameComponent";
import TourDates from "./startDate";

const tour = {
  startLocation: {
    type: "Point",
    coordinates: [-80.185942, 25.774772],
    address: "301 Biscayne Blvd, Miami, FL 33132, USA",
    description: "Miami, USA",
  },
  _id: "5c88fa8cf4afda39709c2955",
  name: "The Sea Explorer",
  duration: 7,
  maxGroupSize: 15,
  difficulty: "medium",
  ratingsAverage: 4.8,
  ratingsQuantity: 5,
  price: 497,
  summary: "Exploring the jaw-dropping US east coast by foot and by boat",
  description:
    "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  imageCover: "tour-2-cover.jpg",
  images: ["tour-2-1.jpg", "tour-2-2.jpg", "tour-2-3.jpg"],
  startDates: [
    "2021-06-19T09:00:00.000Z",
    "2021-07-20T09:00:00.000Z",
    "2021-08-18T09:00:00.000Z",
  ],
  secretTour: false,
  locations: [
    {
      type: "Point",
      coordinates: [-80.128473, 25.781842],
      name: "Lummus Park Beach",
      day: 1,
      _id: "5c88fa8cf4afda39709c2959",
      id: "5c88fa8cf4afda39709c2959",
    },
    {
      type: "Point",
      coordinates: [-80.647885, 24.909047],
      name: "Islamorada",
      day: 2,
      _id: "5c88fa8cf4afda39709c2958",
      id: "5c88fa8cf4afda39709c2958",
    },
    {
      type: "Point",
      coordinates: [-81.0784, 24.707496],
      name: "Sombrero Beach",
      day: 3,
      _id: "5c88fa8cf4afda39709c2957",
      id: "5c88fa8cf4afda39709c2957",
    },
    {
      type: "Point",
      coordinates: [-81.768719, 24.552242],
      name: "West Key",
      day: 5,
      _id: "5c88fa8cf4afda39709c2956",
      id: "5c88fa8cf4afda39709c2956",
    },
  ],
  guides: [
    {
      type: "Point",
      coordinates: [-80.128473, 25.781842],
      name: "Lummus Park Beach",
      day: 1,
      _id: "5c88fa8cf4afda39709c2959",
      id: "5c88fa8cf4afda39709c2959",
      description:
        "Lummus Park Beach is a stunning beachfront park in Miami’s famous South Beach. With its soft white sand, swaying palm trees, and scenic ocean views, it’s a favorite spot for sunbathers, joggers, and volleyball players. The lively atmosphere, proximity to restaurants, and vibrant nightlife make it an ideal destination for visitors. Whether relaxing by the waves or exploring the iconic Art Deco district, this beach offers endless enjoyment.",
    },
    {
      type: "Point",
      coordinates: [-80.647885, 24.909047],
      name: "Islamorada",
      day: 2,
      _id: "5c88fa8cf4afda39709c2958",
      id: "5c88fa8cf4afda39709c2958",
      description:
        "Islamorada, known as the 'Sportfishing Capital of the World,' is a paradise in the Florida Keys. Its crystal-clear waters, vibrant coral reefs, and abundant marine life attract divers, anglers, and adventure seekers. The island boasts scenic boat tours, delicious seafood restaurants, and breathtaking sunsets. Whether exploring its rich history, snorkeling in turquoise waters, or simply relaxing on the beach, Islamorada offers an unforgettable island getaway experience.",
    },
    {
      type: "Point",
      coordinates: [-81.0784, 24.707496],
      name: "Sombrero Beach",
      day: 3,
      _id: "5c88fa8cf4afda39709c2957",
      id: "5c88fa8cf4afda39709c2957",
      description:
        "Sombrero Beach is a hidden gem in Marathon, Florida, offering pristine sandy shores and warm, clear waters. This family-friendly beach is perfect for swimming, picnicking, and soaking up the sun. A nearby coral reef makes it a great spot for snorkeling and marine exploration. With shaded pavilions, a playground, and breathtaking sunset views, Sombrero Beach is an ideal destination for both relaxation and outdoor adventure.",
    },
    {
      type: "Point",
      coordinates: [-81.768719, 24.552242],
      name: "West Key",
      day: 5,
      _id: "5c88fa8cf4afda39709c2956",
      id: "5c88fa8cf4afda39709c2956",
      description:
        "West Key is a secluded island in the Florida Keys, known for its untouched natural beauty and abundant wildlife. A perfect escape from the crowds, it offers serene beaches, crystal-clear waters, and fantastic kayaking opportunities. Birdwatchers and nature enthusiasts will love exploring its diverse ecosystem. Whether enjoying a peaceful day on the shore or discovering hidden coves, West Key is a tranquil paradise for those seeking a quiet retreat.",
    },
  ],
  slug: "the-sea-explorer",
  __v: 0,
  durationWeeks: 1,
  reviews: [
    {
      _id: "5c8a34ed14eb5c17645c9108",
      review:
        "Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt",
      rating: 5,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a1dfa2f8fb814b56fa181",
        name: "Lourdes Browning",
        photo: "user-2.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a34ed14eb5c17645c9108",
    },
    {
      _id: "5c8a36b714eb5c17645c910f",
      review:
        "Pulvinar taciti etiam aenean lacinia natoque interdum fringilla suspendisse nam sapien urna!",
      rating: 4,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a1e1a2f8fb814b56fa182",
        name: "Sophie Louise Hart",
        photo: "user-3.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a36b714eb5c17645c910f",
    },
    {
      _id: "5c8a391f14eb5c17645c911f",
      review:
        "Sem feugiat sed lorem vel dignissim platea habitasse dolor suscipit ultricies dapibus",
      rating: 5,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a211f2f8fb814b56fa188",
        name: "Cristian Vega",
        photo: "user-9.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a391f14eb5c17645c911f",
    },
    {
      _id: "5c8a3a7014eb5c17645c9124",
      review:
        "Blandit varius nascetur est felis praesent lorem himenaeos pretium dapibus tellus bibendum consequat ac duis",
      rating: 5,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a23c82f8fb814b56fa18d",
        name: "Laura Wilson",
        photo: "user-14.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a3a7014eb5c17645c9124",
    },
    {
      _id: "5c8a3b7c14eb5c17645c912f",
      review:
        "Tempor pellentesque eu placerat auctor enim nam suscipit tincidunt natoque ipsum est.",
      rating: 5,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a23de2f8fb814b56fa18e",
        name: "Max Smith",
        photo: "user-15.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a3b7c14eb5c17645c912f",
    },
    {
      _id: "5c8a3cdc14eb5c17645c913b",
      review:
        "Magna magnis tellus dui vivamus donec placerat vehicula erat turpis",
      rating: 5,
      createAt: "2025-01-18T18:38:24.043Z",
      user: {
        _id: "5c8a24822f8fb814b56fa192",
        name: "John Riley",
        photo: "user-19.jpg",
      },
      tour: "5c88fa8cf4afda39709c2955",
      __v: 0,
      id: "5c8a3cdc14eb5c17645c913b",
    },
  ],
  id: "5c88fa8cf4afda39709c2955",
};

function Product() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <ImageCarousel images={tour.images} coverImage={tour.imageCover} />
      <div className="flex md:flex-row flex-col ">
        <NameComponent
          name={tour.name}
          duration={tour.duration}
          maxGroupSize={tour.maxGroupSize}
          difficulty={tour.difficulty}
          price={tour.price}
          summary={tour.summary}
        />
        <TourDates
          startDates={tour.startDates}
          guides={tour.guides}
          ratingsAverage={tour.ratingsAverage}
          ratingsQuantity={tour.ratingsQuantity}
        />
      </div>
    </>
  );
}

export default Product;
