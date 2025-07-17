import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import D_Students from '../components/dashboard/D_Students';
import D_Teachers from '../components/dashboard/D_Teachers';
import D_Results from '../components/dashboard/D_Results';
import D_Fees from '../components/dashboard/D_Fees';
import D_Classes from '../components/dashboard/D_Classes';
import D_Subjects from '../components/dashboard/D_Subjects';
import D_Attendance from '../components/dashboard/D_Attendance';
import D_Exams from '../components/dashboard/D_Exams';
import D_Profile from '../components/dashboard/D_Profile';

const Dashboard = () => {
    const { isAuth, user } = useContext(Context);
    const [components, setComponents] = useState("Profil");

    if (!isAuth) {
        return <Navigate to="/" />;
    }

    const renderComponent = () => {
        if (user?.role !== "Admin") {
        // Untuk Guru dan Murid, hanya tampilkan Profil
        return <D_Profile />;
        }

        // Untuk Admin, render sesuai tombol yang dipilih
        switch (components) {
        case "Murid":
            return <D_Students />;
        case "Guru":
            return <D_Teachers />;
        case "Nilai":
            return <D_Results />;
        case "Pembayaran":
            return <D_Fees />;
        case "Kelas":
            return <D_Classes />;
        case "Pelajaran":
            return <D_Subjects />;
        case "Presensi":
            return <D_Attendance />;
        case "Ujian":
            return <D_Exams />;
        case "Profil":
            return <D_Profile />;
        default:
            return (
            <div className="text-center text-red-600 text-xl mt-10">
                <p>Komponen tidak ditemukan</p>
            </div>
            );
        }
    };

    return (
        <div className="flex min-h-screen">
        <Sidebar setComponents={setComponents} />
        <div className="flex-1 p-8">{renderComponent()}</div>
        </div>
    );
};

export default Dashboard;
