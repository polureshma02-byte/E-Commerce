import { useState } from "react";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 12403,
    quality: "Premium",
    quantity: 34,
    category: "Electronics",
    links: [
      { store: "Amazon", url: "https://amazon.com", color: "#FF9900", icon: "🛒" },
      { store: "Best Buy", url: "https://bestbuy.com", color: "#0046BE", icon: "🔵" },
      { store: "Walmart", url: "https://walmart.com", color: "#0071CE", icon: "🏪" },
      { store: "eBay", url: "https://ebay.com", color: "#E53238", icon: "🔖" },
    ],
  },
  {
    id: 2,
    name: "Apple AirPods Pro (2nd Gen)",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&q=80",
    price: 189.00,
    originalPrice: 249.00,
    rating: 4.7,
    reviews: 8921,
    quality: "Premium",
    quantity: 120,
    category: "Electronics",
    links: [
      { store: "Amazon", url: "https://amazon.com", color: "#FF9900", icon: "🛒" },
      { store: "Apple Store", url: "https://apple.com", color: "#555", icon: "🍎" },
      { store: "Best Buy", url: "https://bestbuy.com", color: "#0046BE", icon: "🔵" },
    ],
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    price: 109.95,
    originalPrice: 150.00,
    rating: 4.5,
    reviews: 5230,
    quality: "Standard",
    quantity: 8,
    category: "Footwear",
    links: [
      { store: "Nike", url: "https://nike.com", color: "#111", icon: "👟" },
      { store: "Amazon", url: "https://amazon.com", color: "#FF9900", icon: "🛒" },
      { store: "Foot Locker", url: "https://footlocker.com", color: "#CC0000", icon: "👞" },
      { store: "Zappos", url: "https://zappos.com", color: "#5B5EA6", icon: "🛍️" },
    ],
  },
  {
    id: 4,
    name: "Instant Pot Duo 7-in-1",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&q=80",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 22100,
    quality: "Standard",
    quantity: 56,
    category: "Kitchen",
    links: [
      { store: "Amazon", url: "https://amazon.com", color: "#FF9900", icon: "🛒" },
      { store: "Target", url: "https://target.com", color: "#CC0000", icon: "🎯" },
      { store: "Walmart", url: "https://walmart.com", color: "#0071CE", icon: "🏪" },
    ],
  },
  {
    id: 5,
    name: "Levi's 501 Original Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
    price: 49.50,
    originalPrice: 70.00,
    rating: 4.3,
    reviews: 3875,
    quality: "Standard",
    quantity: 200,
    category: "Apparel",
    links: [
      { store: "Levi's", url: "https://levi.com", color: "#C41E3A", icon: "👖" },
      { store: "Amazon", url: "https://amazon.com", color: "#FF9900", icon: "🛒" },
      { store: "Macy's", url: "https://macys.com", color: "#E31837", icon: "🏬" },
    ],
  },
];

const QualityBadge = ({ quality }) => {
  const colors = {
    Premium: { bg: "#fff8e7", text: "#b45309", border: "#fcd34d" },
    Standard: { bg: "#f0fdf4", text: "#166534", border: "#86efac" },
  };
  const c = colors[quality] || colors.Standard;
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: "999px", padding: "2px 10px", fontSize: "11px",
      fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
    }}>{quality}</span>
  );
};

const StarRating = ({ rating, reviews }) => {
  const full = Math.floor(rating);
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= full ? "#FBBF24" : "#374151", fontSize: "13px" }}>★</span>
      ))}
      <span style={{ color: "#94a3b8", fontSize: "12px", marginLeft: "5px" }}>
        {rating} ({reviews > 999 ? (reviews/1000).toFixed(1)+"k" : reviews})
      </span>
    </span>
  );
};

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      const q = query.toLowerCase();
      const found = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.quality.toLowerCase().includes(q)
      );
      setResults(found);
      setSearched(true);
      setLoading(false);
    }, 650);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      fontFamily: "'Georgia', serif",
      paddingBottom: "60px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "52px 20px 32px" }}>
        <div style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900,
          background: "linear-gradient(90deg, #f9c74f, #f3722c, #f94144)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>ShopRadar</div>
        <p style={{ color: "#a5b4fc", fontSize: "14px", margin: 0 }}>
          Search any product · Compare prices · Shop everywhere
        </p>
      </div>

      {/* Search */}
      <div style={{
        maxWidth: "640px", margin: "0 auto 40px", padding: "0 20px",
        display: "flex", gap: "10px",
      }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder='Try "headphones", "shoes", "kitchen"…'
          style={{
            flex: 1, padding: "14px 20px", borderRadius: "14px",
            border: "1.5px solid rgba(165,180,252,0.3)",
            background: "rgba(255,255,255,0.07)", color: "#fff",
            fontSize: "15px", outline: "none", fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "14px 26px", borderRadius: "14px",
            background: "linear-gradient(135deg, #f9c74f, #f3722c)",
            color: "#fff", fontWeight: 800, fontSize: "15px",
            border: "none", cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 4px 18px rgba(249,180,79,0.35)",
          }}
        >Search</button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", color: "#a5b4fc", padding: "30px" }}>🔍 Searching…</div>
      )}

      {searched && !loading && results.length === 0 && (
        <div style={{ textAlign: "center", color: "#a5b4fc", padding: "40px" }}>
          😕 No results for <strong style={{ color: "#f9c74f" }}>"{query}"</strong><br/>
          <span style={{ fontSize: "13px", opacity: 0.7 }}>Try "electronics", "shoes", "kitchen" or "jeans"</span>
        </div>
      )}

      {/* Cards Grid */}
      <div style={{
        maxWidth: "920px", margin: "0 auto", padding: "0 16px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "22px",
      }}>
        {results.map(product => (
          <div key={product.id} style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "20px",
            border: "1.5px solid rgba(165,180,252,0.15)",
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}>
            {/* Product Image */}
            <div style={{ position: "relative" }}>
              <img src={product.image} alt={product.name}
                style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <QualityBadge quality={product.quality} />
              </div>
              {product.originalPrice > product.price && (
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  background: "#EF4444", color: "#fff",
                  borderRadius: "8px", padding: "2px 8px",
                  fontSize: "11px", fontWeight: 800,
                }}>
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ padding: "16px 18px 18px" }}>
              <div style={{
                color: "#a5b4fc", fontSize: "10px", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: "4px", fontWeight: 700,
              }}>{product.category}</div>

              <div style={{
                color: "#f1f5f9", fontWeight: 700, fontSize: "15px",
                lineHeight: 1.35, marginBottom: "10px",
              }}>{product.name}</div>

              <StarRating rating={product.rating} reviews={product.reviews} />

              {/* Price Row */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-end", margin: "12px 0 6px",
              }}>
                <div>
                  <span style={{ color: "#34d399", fontSize: "22px", fontWeight: 900 }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span style={{ color: "#6B7280", fontSize: "13px", textDecoration: "line-through", marginLeft: "6px" }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div style={{
                  background: product.quantity < 15 ? "rgba(239,68,68,0.15)" : "rgba(52,211,153,0.12)",
                  color: product.quantity < 15 ? "#FCA5A5" : "#6EE7B7",
                  border: product.quantity < 15 ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(52,211,153,0.2)",
                  borderRadius: "8px", padding: "3px 9px", fontSize: "11px", fontWeight: 700,
                }}>
                  {product.quantity < 15 ? `⚠️ Only ${product.quantity} left` : `✅ ${product.quantity} in stock`}
                </div>
              </div>

              {/* Store Links */}
              <div style={{ marginTop: "14px" }}>
                <div style={{
                  color: "#94a3b8", fontSize: "11px", textTransform: "uppercase",
                  letterSpacing: "0.08em", marginBottom: "8px", fontWeight: 600,
                }}>Buy from</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {product.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "5px",
                        padding: "5px 11px", borderRadius: "10px",
                        background: "rgba(255,255,255,0.07)",
                        border: `1.5px solid ${link.color}55`,
                        color: "#e2e8f0", fontSize: "12px", fontWeight: 600,
                        textDecoration: "none", cursor: "pointer",
                      }}
                    >
                      <span>{link.icon}</span>{link.store} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
