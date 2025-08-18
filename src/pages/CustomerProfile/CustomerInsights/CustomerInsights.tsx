export const CustomerInsights = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-3">
        <div className="flex gap-1 bg-white rounded-lg h-[72px] border border-blueGray-100 p-4 w-[50%]">
          <div>Some Icon</div>
          <div className="flex flex-col">
            <span>Mobile Number</span>
            <span>+96572738859</span>
          </div>
        </div>
        <div className="flex gap-1 bg-white rounded-lg h-[72px] border border-blueGray-100 p-4 w-[50%]">
          <div>Some Icon</div>
          <div className="flex flex-col">
            <span>Mobile Number</span>
            <span>+96572738859</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[18px] p-4 bg-white w-full rounded-lg border border-blueGray-100">
        <div className="flex justify-start gap-[10px]">
          <div>Some Icon</div>
          <span>Trusted Device IPs</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
            10.10.10.1
          </div>
          <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
            10.10.10.1
          </div>
          <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
            10.10.10.1
          </div>
          <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
            10.10.10.1
          </div>
          <div className="w-full bg-blueGray-50 border border-blueGray-200 rounded-lg px-4 py-[10px] h-[40px]">
            10.10.10.1
          </div>
        </div>
      </div>
    </div>
  );
};
