import React, { useState } from 'react'
import { Star, MapPin, Globe, Users, Pencil, ChevronDown, ChevronUp, Shield, CheckCircle, MessageCircle, X, Reply, EyeOff, Eye } from 'lucide-react'
import { CompnyProfile, ReviewSection } from '../index'
function CompanyProfilePage(props) {
    

   
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-25 to-white p-4 md:p-6 relative overflow-hidden">
            {/* Enhanced decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top section background elements */}
                <div className="absolute top-16 left-8 text-amber-100 w-12 h-12 rotate-12 opacity-40">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-32 right-16 text-amber-100 w-16 h-16 -rotate-12 opacity-35">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute top-24 left-1/3 text-amber-100 w-8 h-8 rotate-45 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-8 right-1/3 text-amber-100 w-14 h-14 -rotate-45 opacity-25">
                    <Shield className="w-full h-full" />
                </div>
                
                {/* Smile emojis */}
                <div className="absolute top-40 left-20 text-6xl opacity-20 rotate-12"><Star className="w-full h-full" /></div>
                <div className="absolute top-20 right-32 text-4xl opacity-15 -rotate-12"><Pencil className="w-full h-full" /></div>
                <div className="absolute top-60 left-2/3 text-5xl opacity-18 rotate-6">🙂</div>
                
                {/* Middle section elements */}
                <div className="absolute top-1/3 right-1/4 text-amber-100 w-10 h-10 rotate-90 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-1/2 left-1/4 text-amber-100 w-18 h-18 -rotate-45 opacity-35">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute top-2/5 right-12 text-amber-100 w-12 h-12 rotate-180 opacity-25">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute top-1/2 left-12 text-amber-100 w-14 h-14 rotate-45 opacity-30">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* More smile emojis in middle */}
                <div className="absolute top-1/3 left-16 text-5xl opacity-15 rotate-45"><Star className="w-full h-full" /></div>
                <div className="absolute top-2/5 right-20 text-4xl opacity-20 -rotate-30"><Pencil className="w-full h-full" /></div>
                <div className="absolute top-1/2 right-1/3 text-6xl opacity-12 rotate-15">😌</div>
                
                {/* Bottom section elements */}
                <div className="absolute bottom-40 right-20 text-amber-100 w-20 h-20 -rotate-12 opacity-40">
                    <CheckCircle className="w-full h-full" />
                </div>
                <div className="absolute bottom-32 left-16 text-amber-100 w-10 h-10 rotate-90 opacity-25">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute bottom-20 right-40 text-amber-100 w-16 h-16 -rotate-45 opacity-30">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-24 left-1/3 text-amber-100 w-12 h-12 rotate-30 opacity-35">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute bottom-16 right-1/4 text-amber-100 w-14 h-14 -rotate-60 opacity-25">
                    <Shield className="w-full h-full" />
                </div>
                <div className="absolute bottom-48 left-8 text-amber-100 w-8 h-8 rotate-45 opacity-40">
                    <Star className="w-full h-full" />
                </div>
                
                {/* Bottom smile emojis */}
                <div className="absolute bottom-32 left-32 text-5xl opacity-18 rotate-30"><Star className="w-full h-full" /></div>
                <div className="absolute bottom-20 right-24 text-4xl opacity-22 -rotate-20"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-40 left-2/3 text-6xl opacity-15 rotate-45">🥰</div>
                <div className="absolute bottom-60 right-8 text-5xl opacity-20 -rotate-15"><Pencil className="w-full h-full" /></div>
                
                {/* Additional scattered elements */}
                <div className="absolute top-72 left-4 text-amber-100 w-6 h-6 rotate-180 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-96 right-6 text-amber-100 w-10 h-10 rotate-90 opacity-25">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-72 left-6 text-amber-100 w-8 h-8 -rotate-45 opacity-35">
                    <CheckCircle className="w-full h-full" />
                </div>
                <div className="absolute bottom-96 right-4 text-amber-100 w-12 h-12 rotate-60 opacity-20">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* More scattered emojis */}
                <div className="absolute top-80 right-1/2 text-4xl opacity-16 rotate-20"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-80 left-1/2 text-5xl opacity-19 -rotate-25">🤩</div>
                <div className="absolute top-1/4 left-8 text-3xl opacity-22 rotate-35"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-1/4 right-12 text-4xl opacity-14 -rotate-40">🥳</div>
                
                {/* Company profile specific elements */}
                <div className="absolute top-1/5 right-1/5 text-amber-100 w-16 h-16 rotate-25 opacity-20">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute top-3/5 left-1/5 text-amber-100 w-14 h-14 -rotate-35 opacity-25">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* Review section specific elements */}
                <div className="absolute bottom-1/3 left-1/6 text-amber-100 w-18 h-18 rotate-15 opacity-30">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-1/5 right-1/6 text-amber-100 w-16 h-16 -rotate-25 opacity-25">
                    <CheckCircle className="w-full h-full" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Enhanced Header Section */}
                
                {/* <CompanyProfile 
  companyData={apiCompanyData} 
  ratingBreakdown={apiRatingData} 
/> */}

                <CompnyProfile></CompnyProfile>
                <ReviewSection></ReviewSection>
            </div>
        </div>
    )
}

export default CompanyProfilePage