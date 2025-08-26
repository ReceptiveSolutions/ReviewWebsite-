import { Star, MapPin, Mail, Building } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company, onClick,cId }) => {
  // const [compId,setCompId] = useState(0)
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.stopPropagation(); // Prevent parent onClick
    console.log(company.id, "cid");

    navigate(`/comp-profilepage/${company.id}`);
  };

  // Parse categories, handling nested string array
  const categories = company.categories
    ? typeof company.categories === 'string'
      ? JSON.parse(company.categories)
      : company.categories
    : [];
  const parsedCategories = typeof categories[0] === 'string' ? JSON.parse(categories[0]) : categories;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-amber-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {company.comp_profile_img ? (
            <img
              src={`http://localhost:5000/uploads/${company.comp_profile_img}`}
              alt={company.name}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="text-amber-600" size={24} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{company.name}</h3>
              {company.isverified && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < Math.floor(company.avg_rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {company.avg_rating ? `${company.avg_rating}/5` : 'No ratings'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={16} />
          <p className="text-gray-600 text-sm line-clamp-2">{company.address}</p>
        </div>

        {parsedCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {parsedCategories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-medium"
              >
                {category}
              </span>
            ))}
            {parsedCategories.length > 3 && (
              <span className="text-gray-500 text-xs">+{parsedCategories.length - 3} more</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {company.business_email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span className="truncate">{company.business_email}</span>
              </div>
            )}
          </div>
          <button
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            onClick={handleNavigate}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;