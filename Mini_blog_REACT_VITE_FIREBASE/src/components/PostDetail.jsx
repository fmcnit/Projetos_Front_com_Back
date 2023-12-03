import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";
import { useAuthValue } from "../contexts/AuthContext";



const PostDetail = ({ post }) => {
  
  const {user} = useAuthValue()

  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdby}>por: {user.email}</p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>{tag}</span>
            
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;