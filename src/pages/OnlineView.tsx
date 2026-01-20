import { useState } from "react";
import type { KeyboardEvent } from "react";

type OnlineViewProps = {
  activeSecondaryId: string | null;
};

const OnlineView = ({ activeSecondaryId }: OnlineViewProps) => {
  const [openTrafficId, setOpenTrafficId] = useState<string | null>(null);

  const isPresenceReviews = activeSecondaryId === "reviews";
  const isPresenceTraffic = activeSecondaryId === "traffic";
  const isPresenceSocial = activeSecondaryId === "social";
  const isPresenceSeo = activeSecondaryId === "seo";

  const handleTrafficToggle = (id: string) => {
    setOpenTrafficId((prev) => (prev === id ? null : id));
  };

  const handleTrafficKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTrafficToggle(id);
    }
  };

  return isPresenceReviews ? (
    (() => {
      const reviews = [
        {
          id: "review-1",
          source: "Yelp",
          rating: "4.6",
          date: "Sep 3, 2024",
          reviewer: "Mia Torres",
          text: "Warm service and a beautifully balanced menu. The roasted chicken was perfectly seasoned and the sides felt thoughtful without being fussy.",
        },
        {
          id: "review-2",
          source: "Google",
          rating: "5.0",
          date: "Aug 28, 2024",
          reviewer: "Liam Chen",
          text: "Stopped in after work and the staff made it effortless. Cocktails were sharp, food came quickly, and the dining room felt calm and polished.",
        },
        {
          id: "review-3",
          source: "TripAdvisor",
          rating: "4.2",
          date: "Aug 22, 2024",
          reviewer: "Priya Patel",
          text: "Everything tasted fresh and the pacing was just right. A great spot for a quiet dinner with friends when you want something consistent.",
        },
        {
          id: "review-4",
          source: "Uber Eats",
          rating: "4.8",
          date: "Aug 20, 2024",
          reviewer: "Jamal Rivers",
          text: "Delivery arrived early, packaging was tidy, and the portions were generous. The grain bowl held up perfectly and still tasted bright.",
        },
        {
          id: "review-5",
          source: "Google",
          rating: "4.4",
          date: "Aug 15, 2024",
          reviewer: "Sofia Alvarez",
          text: "Loved the atmosphere and the staff recommendations. Desserts were the highlight, especially the citrus tart with a crisp crust.",
        },
        {
          id: "review-6",
          source: "Yelp",
          rating: "4.1",
          date: "Aug 11, 2024",
          reviewer: "Noah Bennett",
          text: "Solid neighborhood staple. The seasonal salad was balanced and the service team checked in without interrupting conversation.",
        },
        {
          id: "review-7",
          source: "TripAdvisor",
          rating: "4.7",
          date: "Aug 5, 2024",
          reviewer: "Harper Scott",
          text: "We had a great lunch here. The menu was easy to navigate and everything felt thoughtfully prepared with a nice finish.",
        },
      ];
      const reviewTintMap: Record<string, string> = {
        google: "review-card--google",
        "google maps": "review-card--google",
        "google business profile": "review-card--google",
        yelp: "review-card--yelp",
        tripadvisor: "review-card--tripadvisor",
        "uber eats": "review-card--uber",
        "delivery apps": "review-card--delivery",
      };

      return (
        <div className="truth-section__content">
          <div className="reviews-feed" role="list">
            {reviews.map((review) => {
              const tintClass =
                reviewTintMap[review.source.toLowerCase()] ??
                "review-card--neutral";
              return (
                <article
                  key={review.id}
                  className={`review-card ${tintClass}`}
                  role="listitem"
                >
                  <div className="review-card__meta">
                    <span className="review-card__source">
                      {review.source}
                    </span>
                    <span className="review-card__rating">
                      {review.rating}★
                    </span>
                  </div>
                  <div className="review-card__details">
                    <span className="review-card__date">{review.date}</span>
                    <span className="review-card__reviewer">
                      {review.reviewer}
                    </span>
                  </div>
                  <p className="review-card__text">{review.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      );
    })()
  ) : isPresenceTraffic ? (
    (() => {
      const sources = [
        {
          id: "google-search",
          label: "Google Search",
          metric: "1,420 views",
          delta: "+6% WoW",
          comparison: "1,420 → 1,338",
          topAction: "Website visits",
          narrative: "Discovery continues to build week over week.",
        },
        {
          id: "google-maps",
          label: "Google Maps",
          metric: "980 views",
          delta: "+2% WoW",
          comparison: "980 → 962",
          topAction: "Directions",
          narrative: "Local intent remains steady with slight growth.",
        },
        {
          id: "yelp",
          label: "Yelp",
          metric: "412 views",
          delta: "−3% WoW",
          comparison: "412 → 425",
          topAction: "Calls",
          narrative: "Softer demand this week but still engaged.",
        },
        {
          id: "tripadvisor",
          label: "TripAdvisor",
          metric: "368 views",
          delta: "+4% WoW",
          comparison: "368 → 353",
          topAction: "Menu views",
          narrative: "Travel discovery is trending upward.",
        },
        {
          id: "delivery-apps",
          label: "Delivery Apps",
          metric: "1,106 views",
          delta: "−1% WoW",
          comparison: "1,106 → 1,118",
          topAction: "Add to cart",
          narrative: "Digital ordering remains consistent overall.",
        },
      ];

      return (
        <div className="truth-section__content">
          <div className="traffic-accordion" role="list">
            {sources.map((source) => {
              const isOpen = openTrafficId === source.id;
              return (
                <div key={source.id} className="traffic-accordion__item">
                  <div
                    className="traffic-accordion__row"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => handleTrafficToggle(source.id)}
                    onKeyDown={(event) =>
                      handleTrafficKeyDown(event, source.id)
                    }
                  >
                    <span className="traffic-accordion__label">
                      {source.label}
                    </span>
                    <span className="traffic-accordion__metric">
                      {source.metric}
                    </span>
                    <span className="traffic-accordion__delta">
                      {source.delta}
                    </span>
                    <span className="traffic-accordion__chevron" aria-hidden="true">
                      {isOpen ? "⌃" : "⌄"}
                    </span>
                  </div>
                  <div
                    className={`traffic-accordion__panel${
                      isOpen ? " traffic-accordion__panel--open" : ""
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="traffic-accordion__details">
                      <div className="traffic-accordion__detail">
                        <span className="traffic-accordion__detail-label">
                          Last 7 days vs prior 7 days
                        </span>
                        <span className="traffic-accordion__detail-value">
                          {source.comparison}
                        </span>
                      </div>
                      <div className="traffic-accordion__detail">
                        <span className="traffic-accordion__detail-label">
                          Top action
                        </span>
                        <span className="traffic-accordion__detail-value">
                          {source.topAction}
                        </span>
                      </div>
                      <p className="traffic-accordion__narrative">
                        {source.narrative}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    })()
  ) : isPresenceSocial ? (
    (() => {
      const feedItems = [
        {
          id: "social-1",
          platform: "Instagram",
          type: "post",
          timestamp: "Today · 9:40 AM",
          postType: "Reel",
          caption:
            "Morning service highlight with the seasonal breakfast board and a quick chef walkthrough of the prep line.",
          likes: 482,
          comments: 36,
          views: 4200,
        },
        {
          id: "social-2",
          platform: "TikTok",
          type: "highlight",
          timestamp: "Today · 8:10 AM",
          message: "Reel performing above average for the week.",
        },
        {
          id: "social-3",
          platform: "Facebook",
          type: "post",
          timestamp: "Yesterday · 6:12 PM",
          postType: "Photo",
          caption:
            "Golden hour on the patio. Thank you for another full-house evening and the warm reviews.",
          likes: 214,
          comments: 18,
          views: 0,
        },
        {
          id: "social-4",
          platform: "Google Business Profile",
          type: "signal",
          timestamp: "Yesterday · 10:05 AM",
          message: "Engagement down vs last month.",
        },
        {
          id: "social-5",
          platform: "X",
          type: "post",
          timestamp: "Sep 12 · 3:20 PM",
          postType: "Text",
          caption:
            "Chef’s tasting menu returns this weekend. Limited bar seats available for walk-ins.",
          likes: 96,
          comments: 12,
          views: 820,
        },
        {
          id: "social-6",
          platform: "TikTok",
          type: "post",
          timestamp: "Sep 11 · 5:04 PM",
          postType: "Video",
          caption:
            "Behind-the-scenes of the pastry team plating tonight’s dessert trio.",
          likes: 318,
          comments: 22,
          views: 3100,
        },
        {
          id: "social-7",
          platform: "Instagram",
          type: "signal",
          timestamp: "Sep 10 · 9:00 AM",
          message: "New platform activity detected.",
        },
      ];
      const socialTintMap: Record<string, string> = {
        instagram: "social-card--instagram",
        tiktok: "social-card--tiktok",
        facebook: "social-card--facebook",
        "google business profile": "social-card--google",
        x: "social-card--x",
      };

      return (
        <div className="truth-section__content">
          <div className="social-feed" role="list">
            {feedItems.map((item) => {
              const tintClass =
                socialTintMap[item.platform.toLowerCase()] ?? "social-card--neutral";
              return (
                <article
                  key={item.id}
                  className={`social-card ${tintClass}`}
                  role="listitem"
                >
                  <div className="social-card__header">
                    <span className="social-card__platform">
                      {item.platform}
                    </span>
                    <span className="social-card__timestamp">
                      {item.timestamp}
                    </span>
                  </div>
                  {item.type === "post" ? (
                    <>
                      <span className="social-card__type">{item.postType}</span>
                      <p className="social-card__caption">{item.caption}</p>
                      <div className="social-card__engagement">
                        <span>Likes {item.likes}</span>
                        <span>Comments {item.comments}</span>
                        {item.views ? <span>Views {item.views}</span> : null}
                      </div>
                    </>
                  ) : (
                    <p className="social-card__message">{item.message}</p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      );
    })()
  ) : isPresenceSeo ? (
    (() => {
      const visibilityStats = [
        { label: "Indexed pages", value: "128" },
        { label: "Local search visibility", value: "Up" },
        { label: "Estimated monthly impressions", value: "48,200" },
        { label: "Estimated monthly clicks", value: "3,740" },
      ];
      const topQueries = [
        { query: "seasonal tasting menu", impressions: "9,200" },
        { query: "restaurant near union market", impressions: "8,150" },
        { query: "brunch in northeast dc", impressions: "6,980" },
        { query: "private dining dc", impressions: "5,440" },
        { query: "local dinner reservations", impressions: "4,860" },
      ];
      const topPages = [
        { page: "Home", traffic: "1,820" },
        { page: "Menu", traffic: "1,410" },
        { page: "Hours & Location", traffic: "1,060" },
        { page: "Private Dining", traffic: "780" },
        { page: "Reservations", traffic: "640" },
      ];
      const healthChecks = [
        { label: "Title tags present", status: "pass" },
        { label: "Meta descriptions present", status: "pass" },
        { label: "Local business schema detected", status: "unknown" },
        { label: "Sitemap detected", status: "pass" },
        { label: "Mobile-friendly", status: "issue" },
      ];
      const statusColor: Record<string, string> = {
        pass: "#4b7a60",
        unknown: "#9aa3af",
        issue: "#c98a56",
      };

      return (
        <div className="truth-section__content">
          <div className="vendor-section">
            <p className="metric__label">Visibility Summary</p>
            <div className="reporting-list seo-list">
              {visibilityStats.map((stat) => (
                <div key={stat.label} className="reporting-row reporting-row--simple">
                  <div className="reporting-row__label">{stat.label}</div>
                  <div className="reporting-row__value">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="vendor-section">
            <p className="metric__label">Top Queries</p>
            <div className="reporting-list seo-list">
              {topQueries.map((item) => (
                <div key={item.query} className="reporting-row reporting-row--simple">
                  <div className="reporting-row__label">{item.query}</div>
                  <div className="reporting-row__value">{item.impressions}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="vendor-section">
            <p className="metric__label">Top Landing Pages</p>
            <div className="reporting-list seo-list">
              {topPages.map((item) => (
                <div key={item.page} className="reporting-row reporting-row--simple">
                  <div className="reporting-row__label">{item.page}</div>
                  <div className="reporting-row__value">{item.traffic}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="vendor-section">
            <p className="metric__label">SEO Health Checks</p>
            <div className="reporting-list seo-list">
              {healthChecks.map((item) => (
                <div key={item.label} className="reporting-row reporting-row--simple">
                  <div className="reporting-row__label">{item.label}</div>
                  <div
                    className="reporting-row__value"
                    style={{ color: statusColor[item.status] }}
                  >
                    {item.status === "pass"
                      ? "✔"
                      : item.status === "issue"
                        ? "⚠"
                        : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })()
  ) : null;
};

export default OnlineView;
