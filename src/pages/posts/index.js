import axios from "axios";

function Posts({ data }){
  return (
    <ul>
    {
      data.rows && data.rows.map((post,idx)=>(
        <li key={post.userId}>{ post.userNm }</li>
      ))
    }
    </ul>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:3000/api/posts");
  const data = res.data;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return { props: { data: data } }
}

export default Posts;