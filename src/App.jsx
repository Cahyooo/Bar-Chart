import "./index.css";
import BarAxis from "./BarAxis";
import { BarChart } from "./BarChart";
import { ModalProvider, useModal } from "./Modal";

const Modal = () => {
  const { modalData } = useModal();

  const formatDateToQuarter = (dateString) => {
    const date = new Date(dateString); // Mengonversi string ke objek Date
    const year = date.getFullYear(); // Mendapatkan tahun
    const month = date.getMonth(); // Mendapatkan bulan (0-11)

    // Menentukan kuartal berdasarkan bulan
    const quarter = Math.floor(month / 3) + 1; // Q1: bulan 0-2, Q2: 3-5, Q3: 6-8, Q4: 9-11

    return `${year}, Q${quarter}`; // Mengembalikan format yang diinginkan
  };

  return modalData.isVisible ? (
    <div
    id="tooltip"
    data-date={modalData.value[0]}
    data-gdp={modalData.value[1]} 
      className="absolute bg-slate-500 text-white p-2 rounded shadow-lg opacity-90"
      style={{
        top: modalData.y - 30,
        left: modalData.x,
      }}
    >
      <p>{`${formatDateToQuarter(modalData.value[0])}`}</p>
      <p>{`$${modalData.value[1]} Billion`}</p>
    </div>
  ) : null;
};

function App() {
  const width = 1000;
  const height = 650;

  return (
    <ModalProvider>
      <main className="w-[1000px] h-[700px] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl p-[10px]">
        <h1 id="title" className="text-center text-3xl">
          United States GDP
        </h1>
        <BarAxis heightSVG={height} widthSVG={width}>
          <BarChart heightSVG={height} widthSVG={width} />
        </BarAxis>
        <Modal />
      </main>
    </ModalProvider>
  );
}

export default App;
