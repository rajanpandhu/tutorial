import React from "react";

export const  BlogCard = ({blog}) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
          {blog.id}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
            {blog.title}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {blog.body}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              User ID: {blog.userId}
            </span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              Post #{blog.id}
            </span>
          </div>
        </div>
      </div>
    </div>
    )
}