import React, {useState} from 'react';
import { useFetchBlogs } from '../../hooks/useFetchBlogs';
import { LoadingSpinner } from '../include/LoadingSpinner';
import { ErrorMessage } from '../include/ErrorMessage';
import { BlogCard } from '../include/BlogCard';
import { Pagination } from '../include/Pagination';

export const BlogList = () => {
  const { blogs, loading, error, refetch } = useFetchBlogs();
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 All Blog Posts
          </h1>
          <p className="text-gray-600 mb-4">
            Total {blogs.length} blogs available
          </p>
          <button
            onClick={refetch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            🔄 Refresh Blogs
          </button>
        </div>

        {/* Blog List */}
        <div className="space-y-4 mb-8">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};