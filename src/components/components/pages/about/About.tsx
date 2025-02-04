import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container  py-10 px-4">
      <Card className="w-full mx-auto shadow-lg">
        <CardContent className="p-6">
          <img
            src="https://images.unsplash.com/photo-1614102073832-030967418971?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Tour-Next"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-violet-600 mb-4">
            About Tour-Next
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to Tour-Next, your gateway to extraordinary travel
            experiences. We are dedicated to connecting adventurers with
            unforgettable guided tours that showcase the world’s most
            breathtaking destinations.
          </p>
          <h2 className="text-2xl font-semibold text-violet-500 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4">
            At Tour-Next, our mission is to make travel seamless, exciting, and
            accessible. We believe in curating the best tours, ensuring every
            journey is packed with adventure, cultural experiences, and
            meaningful connections.
          </p>
          <h2 className="text-2xl font-semibold text-violet-500 mb-3">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Expertly Curated Tours:</strong> Unique and enriching
              experiences.
            </li>
            <li>
              <strong>Trusted Guides:</strong> Passionate and experienced tour
              guides.
            </li>
            <li>
              <strong>Seamless Booking:</strong> Quick and hassle-free tour
              reservations.
            </li>
            <li>
              <strong>Unmatched Customer Support:</strong> Assistance at every
              step of your journey.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-violet-500 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-700">
            Have questions or need recommendations? Reach out to us, and let’s
            plan your next adventure together!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
