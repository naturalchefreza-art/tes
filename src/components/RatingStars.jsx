export default function RatingStars({ rating, reviews, size = 13 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-${i}-${Math.round(rating * 10)}`}>
                <stop offset={`${Math.max(0, Math.min(1, rating - i + 1)) * 100}%`} stopColor="#FFC107" />
                <stop offset={`${Math.max(0, Math.min(1, rating - i + 1)) * 100}%`} stopColor="#E0E0E0" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
              fill={`url(#star-${i}-${Math.round(rating * 10)})`}
            />
          </svg>
        ))}
      </div>
      {reviews != null && <span className="text-xs text-body">({reviews})</span>}
    </div>
  );
}
