"use client"
import AddButton from "@/components/actions/add_button";
import StudentTable , {IStudent} from "@/app/(student)/components/student_table";
import Modal from "@/components/modal/modal";
import {useState} from "react";
import CreateStudentForm from "@/app/(student)/components/create_student_form";
import UpdateStudentForm , {updateStudentDto} from "@/app/(student)/components/update_student_form";

export default function Home() {
    const [modal, setModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [student, setStudent] = useState({} as  updateStudentDto);
    const [studentId, setStudentId]= useState("");
    const handleOnCloseModal = () => {
        setModal(false);
    }
    const handleOnOpenModal = () => {
        setModal(true)
    }
    const handleOnCloseEditModal = () => {
        setEditModal(false);
    }
    const handleOnOpenEditModal = (studentId: string, student: updateStudentDto) => {
        setStudentId(studentId);
        setStudent(student);
        setEditModal(true);
    }

  return (
    <main className="h-full flex gap-5 px-20 py-4 flex-col items-start">
         <div className="self-end">
             <AddButton onClick={handleOnOpenModal} label="Add new student"  />
         </div>
         <div className="w-full flex-1">
             <StudentTable onOpenEditModal={handleOnOpenEditModal} />
         </div>
         <Modal shouldShowModal={modal} handleOnCLoseModal={handleOnCloseModal}>
             <div className="w-[400px] h-fit p-4    ">
                 <CreateStudentForm  />
             </div>
         </Modal>
        <Modal shouldShowModal={editModal} handleOnCLoseModal={handleOnCloseEditModal}>
            <div className="w-[400px] h-fit p-4    ">
                <UpdateStudentForm   student={student} studentId={studentId}/>
            </div>
        </Modal>
    </main>
  );
}
