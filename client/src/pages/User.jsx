import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import React, { useState } from 'react'

import {
    Table,
    TableBody,
   
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



import { FaRegTrashAlt } from "react-icons/fa";


import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { deleteData } from '@/helpers/deleteCategory'
import usericon from "@/assets/image/user.png"
import moment from 'moment'

const User = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

// console.log(data) debug line user is comming or not


    if (loading) return <Loading />
    return (
        <div>
            <Card>

                <CardContent>
                    <Table>


                        <TableHeader>
                            <TableRow>
                                <TableHead>Role </TableHead>
                                <TableHead>Name </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                 <TableHead>Dated</TableHead>
                                  <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data?.user?.length > 0 ?

                                data.user.map(user =>
                                    <TableRow key={user._id}>
                                        <TableCell>{user?.role}</TableCell>
                                
                                 <TableCell>{user?.name}</TableCell>
                                  <TableCell>{user?.email}</TableCell>
                                   <TableCell>
                                    <img src={user?.avatar || usericon} alt="" className='w-10' />
                                   </TableCell>
                                    <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                                  
                                     

                                        <TableCell className="flex gap-3">

                                            <Button onClick={() => handleDelete(user._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                )

                                :

                                <TableRow>
                                    <TableCell colSpan="3">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default User