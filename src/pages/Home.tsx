import HomeWidgetGroup from "../components/HomeWidget";
const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to the Home Page!</h1>
      <HomeWidgetGroup />
    </div>
  );
};

export default Home;
