import axios from "axios";

function Posts({ data }){
  console.log("data", data);
  return (
    <h3>hello</h3>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:3000/api/posts");
  // const data = res.data;

  const data = [{ id: "1", title: "hi"}];

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: {
      data: data
    }
  }
}

export default Posts;