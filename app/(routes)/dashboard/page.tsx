import React, { Suspense } from "react";
import { fetchAllForms, fetchFormStats } from "@/actions/form.action";
import StatsCards from "./_components/StatsCards";
import { Separator } from "@/components/ui/separator";
import CreateForm from "./_components/CreateForm";
import { Loader } from "lucide-react";
import FormItem from "./_components/_common/FormItem";

const Dashboard = () => {
  return (
    <div className="w-full pt-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-2 md:px-0 pt-1">
        {/* {FORM STATS} */}
        <section className="stats-section w-full bg-white rounded-lg shadow-lg p-6">
          <div className="w-full flex items-center justify-between py-5">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-800">Dashboard</h1>
            <CreateForm />
          </div>
          <StatsListWrap />
        </section>
        
        <div className="mt-10">
          <Separator className="!border-[#eee] !bg-[#eee]" />
        </div>

        {/* {ALL FORM} */}
        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight text-gray-800">
              All Forms
            </h5>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Suspense
              fallback={
                <div className="flex justify-center items-center space-x-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Loader size="3rem" className="animate-spin text-violet-600" key={item} />
                  ))}
                </div>
              }
            >
              <FormList />
            </Suspense>
          </div>

          {/* No form created message */}
          {/* <div className="flex items-center justify-center">
            No form created
          </div> */}
        </section>
      </div>
    </div>
  );
};

async function StatsListWrap() {
  const stats = await fetchFormStats();
  return <StatsCards loading={false} data={stats} />;
}

async function FormList() {
  const { form } = await fetchAllForms();
  return (
    <>
      {form?.map((form) => (
        <FormItem
          key={form.id}
          id={form.id}
          formId={form.formId}
          name={form.name}
          published={form.published}
          createdAt={form.createdAt}
          responses={form.responses}
          views={form.views}
          backgroundColor={form.settings.backgroundColor}
        />
      ))}
    </>
  );
}

export default Dashboard;
