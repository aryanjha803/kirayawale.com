import React from 'react';
import { BookOpen, TrendingUp, Users, Lightbulb } from 'lucide-react';

const blogTopics = [
  {
    title: "Top 10 Items to Rent in India in 2025",
    description: "Discover the most popular rental items across India - from electronics to furniture",
    keywords: "rent items India 2025, popular rental items, electronics rental",
    icon: TrendingUp,
    category: "Trending"
  },
  {
    title: "How Peer-to-Peer Rental Works in India: Complete Guide",
    description: "Everything you need to know about P2P rental platforms and sharing economy",
    keywords: "peer to peer rental India, P2P platform guide, sharing economy",
    icon: Users,
    category: "Guide"
  },
  {
    title: "Why Renting is the Future of Smart Living in India",
    description: "Explore the benefits of rental economy and sustainable consumption",
    keywords: "rental economy India, smart living, sustainable consumption",
    icon: Lightbulb,
    category: "Lifestyle"
  },
  {
    title: "Camera Rental vs Buying: What's Best for Indian Photographers?",
    description: "Cost comparison and benefits of renting photography equipment",
    keywords: "camera rental India, photography equipment rental, DSLR rent",
    icon: BookOpen,
    category: "Photography"
  },
  {
    title: "Bike Rental in Indian Cities: Complete Guide 2025",
    description: "Everything about bike rentals in Mumbai, Delhi, Bangalore and other cities",
    keywords: "bike rental India, bicycle rent cities, urban mobility",
    icon: BookOpen,
    category: "Transportation"
  },
  {
    title: "Furniture Rental for Students and Young Professionals in India",
    description: "Affordable furniture solutions for temporary accommodation",
    keywords: "furniture rental India, student furniture, young professionals",
    icon: BookOpen,
    category: "Lifestyle"
  }
];

const SEOBlogSuggestions = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              High-Ranking <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Blog Topics</span> for SEO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Suggested content topics to boost KirayaWale's search rankings and establish authority in India's rental market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <article 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-100 to-orange-100 rounded-full p-3 mr-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {topic.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">
                      <strong>Target Keywords:</strong> {topic.keywords}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SEO Content Strategy</h3>
              <p className="text-gray-600 mb-6">
                These blog topics are designed to target high-volume keywords related to rental services in India, 
                helping KirayaWale rank higher for terms like "rent anything online India", "peer to peer rental platform", 
                and "India rental startup Aryan Jha".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <strong className="text-blue-800">Primary Keywords:</strong>
                  <br />kirayawale, rent anything online India
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <strong className="text-orange-800">Secondary Keywords:</strong>
                  <br />peer to peer rental platform India
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <strong className="text-green-800">Long-tail Keywords:</strong>
                  <br />India rental startup by Aryan Jha
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOBlogSuggestions;