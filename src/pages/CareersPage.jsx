import { Briefcase, Heart, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const CareersPage = () => {
  const positions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'Full-time'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance for you and your family'
    },
    {
      icon: Briefcase,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote options, and generous PTO policy'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with talented, passionate people in a collaborative environment'
    },
    {
      icon: MapPin,
      title: 'Growth Opportunities',
      description: 'Professional development budget and clear career progression paths'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ekibimize Katılın
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Online moda alışverişinde devrim yaratmamıza ve harika deneyimler yaratmamıza yardımcı olun
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Why Join Us */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Neden BUTIKS'te Çalışmalısınız?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Moda e-ticaretinin geleceğini inşa ediyoruz ve yenilik ile harika tasarım tutkunumuzu paylaşan yetenekli bireyleri arıyoruz.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="inline-flex p-4 bg-indigo-100 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Açık Pozisyonlar
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* No Perfect Match */}
          <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Don't see the perfect role?
            </h3>
            <p className="text-gray-600 mb-4">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link to="/contact">
              <Button>
                Send Your Resume
              </Button>
            </Link>
          </div>
        </section>

        {/* Culture */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Culture
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p>
                At BUTIKS, we believe in creating an inclusive, supportive environment where everyone 
                can do their best work. We value creativity, collaboration, and continuous learning.
              </p>
              <p>
                Our team is diverse, passionate, and committed to making online shopping better for 
                everyone. We celebrate wins together, learn from challenges, and always keep the 
                customer at the center of everything we do.
              </p>
              <p>
                Whether you're working from our offices in New York and LA, or remotely from anywhere 
                in the world, you'll be part of a team that cares about your growth and success.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
