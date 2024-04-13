"use client"
import AverageTable from "@/app/average/components/average_table";
import Modal from "@/components/modal/modal";
import {useState} from "react";
import CreateAverageForm from "@/app/average/components/create_average_form";
import {useUpdateAverage} from "@/app/average/api/average_api";
import UpdateAverageForm from "@/app/average/components/update_average_form";
import Overview from "@/app/average/components/overview";

export default function AveragePage() {
    const [modal, setModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [selectedStudent, setSelectedStudent] = useState<string>("");
    const [selectedAverage, setSelectedAverage] = useState("");
    const [defaultAverage, setDefaultAverage] = useState(Infinity);

    const handleOnCloseModal = () => {
        setModal(false);
    }
    const handleOnOpenModal = (student: string) => {
        setSelectedStudent(student);
        setModal(true);
    }
    const handleOnCloseEditModal = () => {
        setEditModal(false);
    }
    const handleOnOpenEditModal = (averageId: string, weight: number) => {
        setSelectedAverage(averageId);
        setDefaultAverage(weight)
        setEditModal(true);
    }
    return (
        <section className="flex w-full justify-between items-center gap-3">
            <div className="w-[80%] self-start">
                <AverageTable   onAddAverageRequest={handleOnOpenModal} onUpdateAverageRequest={handleOnOpenEditModal}  />
            </div>
            <div className=" w-[20rem]  self-start">
               <Overview />
            </div>
            <Modal shouldShowModal={modal} handleOnCLoseModal={handleOnCloseModal}>
                <div className="w-[400px] h-fit p-4 ">
                    <CreateAverageForm label="Create Average"  studentId={selectedStudent} />
                </div>
            </Modal>
            <Modal shouldShowModal={editModal} handleOnCLoseModal={handleOnCloseEditModal}>
                <div className="w-[400px] h-fit p-4">
                    <UpdateAverageForm averageId={selectedAverage} label="Update Average" defaultAverage={defaultAverage} />
                </div>
            </Modal>
        </section>
    )
}
