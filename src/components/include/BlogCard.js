import React from "react";
import "../../assets/css/blogcard.css";

export const BlogCard = ({blog}) => {
    return (
        <div className="blog-card">
            <div className="blog-card-content">
                <div className="blog-card-id">
                    {blog.id}
                </div>
                <div className="blog-card-body">
                    <h2 className="blog-card-title">
                        {blog.title}
                    </h2>
                    <p className="blog-card-text">
                        {blog.body}
                    </p>
                    <div className="blog-card-meta">
                        <span className="blog-card-badge">
                            User ID: {blog.userId}
                        </span>
                        <span className="blog-card-badge-primary">
                            Post #{blog.id}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Grid container component (optional)
export const BlogGrid = ({children}) => {
    return (
        <div className="blog-grid">
            {children}
        </div>
    )
}