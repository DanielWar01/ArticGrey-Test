import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import type {BlogQuery} from 'storefrontapi.generated';

export default function BlogSection({blogs}: {blogs: BlogQuery}) {
  return (
    <section className="mx-10 mt-10 mb-20">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-[16px]">✍️ Blogs</p>
        <h3 className="text-[40px] font-[500]">Latest Articles</h3>
      </div>
      <div className="grid h-[500px] grid-cols-5 gap-5 article-posts">
        {blogs?.blog?.articles?.nodes?.map((article, index) => (
          <Link
            to={`/blogs/news/${article.handle}`}
            key={article.handle}
            className={`relative article-${index + 1} cursor-pointer`}
          >
            <div>
              <Image
                data={{
                  url: article.image?.url,
                  altText: article.image?.altText,
                }}
                aspectRatio="1/1"
                className="absolute inset-0 h-full w-2/4 object-top object-cover rounded-xl"
                sizes={
                  index === 0
                    ? '(min-width: 45em) 66vw, 100vw'
                    : '(min-width: 45em) 33vw, 50vw'
                }
              />
            </div>
            <div className="article-info text-[16px]">
              <p>
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>
              <h3>{article.title}</h3>
              <div className="flex gap-5">
                <p>
                  By <span>{article.authorV2?.name}</span>
                </p>
                <span>|</span>
                <p>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
