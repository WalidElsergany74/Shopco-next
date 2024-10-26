import React from 'react'

const loading = () => {
  return (
    <div className="product pt-[30px] lg:px-[40px] min-h-screen">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 mb-5">
        
        {/* اليسار - صور المنتج */}
        <div className="left w-full md:w-full lg:w-[60%] flex flex-col md:flex-row lg:flex-row gap-5">
          {/* صور صغيرة */}
          <div className="images order-2 md:order-2 lg:order-1 flex flex-row md:flex-col lg:flex-col gap-3">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="w-auto h-[150px] lg:w-full bg-gray-300 animate-pulse mb-[10px]"
              ></div>
            ))}
          </div>
          {/* الصورة الرئيسية */}
          <div className="mainImage order-1 md:order-1 lg:order-2 flex-1">
            <div className="w-full h-[500px] lg:h-full bg-gray-300 animate-pulse mb-[10px]"></div>
          </div>
        </div>
  
        {/* اليمين - تفاصيل المنتج */}
        <div className="right w-full md:w-full lg:w-[40%] p-2 lg:p-8">
          <div className="details space-y-4">
            {/* العنوان */}
            <div className="w-3/4 h-6 bg-gray-300 animate-pulse"></div>
            
            {/* الوصف */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-300 animate-pulse"></div>
            </div>
  
            {/* تقييم النجوم */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
  
            {/* السعر والخصم */}
            <div className="flex items-center space-x-3 mt-2">
              <div className="w-1/4 h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-1/4 h-6 bg-gray-300 animate-pulse"></div>
            </div>
  
            {/* الألوان */}
            <div className="colors mt-4">
              <span className="w-1/3 h-4 bg-gray-300 animate-pulse"></span>
              <div className="images flex gap-3 mt-2">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="w-[100px] h-[100px] bg-gray-300 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
  
            {/* المقاسات */}
            <div className="sizes mt-6">
              <span className="w-1/3 h-4 bg-gray-300 animate-pulse"></span>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-6 bg-gray-300 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
  
            {/* الكمية */}
            <div className="quantity mt-6 flex items-center space-x-4">
              <div className="w-10 h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-10 h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-10 h-6 bg-gray-300 animate-pulse"></div>
            </div>
  
            {/* الأزرار */}
            <div className="space-y-3 mt-4">
              <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
              <div className="w-full h-12 bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
  
      {/* التبويبات */}
      <div className="w-full mb-5">
        <div className="w-full h-10 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-32 mt-4 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  </div>
  
  )
}

export default loading
