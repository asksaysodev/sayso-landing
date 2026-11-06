import Image from 'next/image';
import { BlogAuthor } from '@/lib/blog';

interface BlogAuthorCardProps {
  author: BlogAuthor;
}

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 flex items-start gap-4 shadow-card">
      <div className="w-14 h-14 rounded-full bg-[#D7DEE1] overflow-hidden shrink-0">
        {author.avatar && (
          <Image
            src={author.avatar}
            alt={author.name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <h4 className="font-hero font-extrabold text-base text-[#10233A] mb-1">{author.name}</h4>
        <p className="text-sm text-[#1D4871]/60 font-sans mb-2">{author.role}</p>
        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2367EE] hover:underline text-sm font-sans inline-flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
