import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
 TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { showToast } from '@/helpers/showToast';
import Loading from '@/components/Loading';
import { deleteData } from '@/helpers/deleteCategory';
import { FaEdit } from "react-icons/fa";
import { FaTrashRestore } from "react-icons/fa";
import moment from 'moment';



const BlogDetails = () => {


 const [refreshData, setRefreshData] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
  
  // console.log("blog data ",blogData)


  //handle detelet function

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted");
    } else {
      showToast("error", "Data not Deleted");
    }
  };


  if (loading) return <Loading />;



  return (
    <div>
    <Card>
      <CardHeader>
        <div>
          <Button asChild className="bg-blue-700 hover:bg-blue-800 border ">
            <Link to={RouteBlogAdd}>Add Blogs</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Dated</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogData && blogData.blog.length > 0 ? (
              blogData.blog.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog?.author?.name}</TableCell>
                  <TableCell>{blog?.category?.name}</TableCell>
                  <TableCell>{blog?.title}</TableCell>
                  <TableCell>{blog?.slug}</TableCell>
                  <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                  <TableCell className="flex gap-3">
                  
                  <Button variant="outline" className="hover:bg-blue-600 hover:text-white" asChild>
                      <Link to={RouteBlogEdit(blog._id)}>
                        <FaEdit />
                      </Link>
                    </Button>
                    <Button onClick={()=>handleDelete(blog._id)}  variant="outline" className="hover:bg-blue-600 hover:text-white " >
                     
                        < FaTrashRestore/>
                     
                    </Button>
                 
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3">Data not Found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
  )
}

export default BlogDetails