import { useEffect, useState } from "react";

interface Review {
  id: number;
  filename: string;
  score: number;
  suggestions: string | string[];
  reviewed_at: string;
}

function History() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, []);

  const totalReviews = reviews.length;

  const averageScore =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce(
            (sum, review) => sum + review.score,
            0
          ) / totalReviews
        ).toFixed(1);

  const bestScore =
    totalReviews === 0
      ? 0
      : Math.max(...reviews.map((review) => review.score));


  const downloadReport = (id: number) => {
    window.open(
      `http://127.0.0.1:5000/report/${id}`,
      "_blank"
    );
  };


  return (
    <div
      style={{
        padding: "35px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea,#764ba2,#06b6d4,#22c55e)",
        backgroundSize: "400% 400%",
        animation: "gradient 12s ease infinite",
      }}
    >

      <style>
        {`
        @keyframes gradient {
          0% {
            background-position:0% 50%;
          }
          50% {
            background-position:100% 50%;
          }
          100% {
            background-position:0% 50%;
          }
        }

        .card {
          transition:0.4s;
        }

        .card:hover {
          transform:translateY(-8px) scale(1.02);
          box-shadow:0 15px 35px rgba(0,0,0,0.25);
        }

        .button:hover {
          transform:scale(1.05);
        }
        `}
      </style>


      <h1
        style={{
          color:"white",
          fontSize:"38px",
          textAlign:"center",
          marginBottom:"35px",
        }}
      >
        📜✨ AI Code Review History ✨📜
      </h1>



      <div
        style={{
          display:"flex",
          gap:"25px",
          justifyContent:"center",
          flexWrap:"wrap",
          marginBottom:"40px",
        }}
      >

        <div
          className="card"
          style={{
            background:"#bfdbfe",
            padding:"25px",
            borderRadius:"20px",
            width:"220px",
            textAlign:"center",
          }}
        >
          <h2>📂</h2>
          <h3>Total Reviews</h3>
          <h1>{totalReviews}</h1>
        </div>


        <div
          className="card"
          style={{
            background:"#bbf7d0",
            padding:"25px",
            borderRadius:"20px",
            width:"220px",
            textAlign:"center",
          }}
        >
          <h2>⭐</h2>
          <h3>Average Score</h3>
          <h1>{averageScore}/10</h1>
        </div>


        <div
          className="card"
          style={{
            background:"#fde68a",
            padding:"25px",
            borderRadius:"20px",
            width:"220px",
            textAlign:"center",
          }}
        >
          <h2>🏆</h2>
          <h3>Best Score</h3>
          <h1>{bestScore}/10</h1>
        </div>

      </div>




      {reviews.length === 0 ? (

        <h2 style={{color:"white"}}>
          😔 No reviews found
        </h2>

      ) : (

        reviews.map((review)=>(

          <div
            className="card"
            key={review.id}
            style={{
              background:"rgba(255,255,255,0.92)",
              padding:"30px",
              borderRadius:"25px",
              marginBottom:"25px",
            }}
          >

            <h2>
              📄 {review.filename}
            </h2>


            <div
              style={{
                display:"inline-block",
                padding:"10px 18px",
                borderRadius:"30px",
                color:"white",
                fontWeight:"bold",
                background:
                  review.score>=8
                  ?"green"
                  :review.score>=5
                  ?"orange"
                  :"red"
              }}
            >
              🚀 Score : {review.score}/10
            </div>


            <p>
              🕒 {review.reviewed_at}
            </p>


            <h3>
              💡 AI Suggestions
            </h3>


            <ul>
              {Array.isArray(review.suggestions)
              ?
              review.suggestions.map((item,index)=>(
                <li key={index}>
                  ✅ {item}
                </li>
              ))
              :
              review.suggestions
              .split("\n")
              .map((item,index)=>(
                <li key={index}>
                  ✅ {item}
                </li>
              ))
              }
            </ul>



            <button
              className="button"
              onClick={()=>downloadReport(review.id)}
              style={{
                marginTop:"20px",
                padding:"14px 25px",
                border:"none",
                borderRadius:"15px",
                background:
                  "linear-gradient(90deg,#2563eb,#7c3aed)",
                color:"white",
                fontSize:"16px",
                cursor:"pointer",
                transition:"0.3s",
              }}
            >
              📄⬇️ Download PDF Report
            </button>


          </div>

        ))

      )}

    </div>
  );
}

export default History;