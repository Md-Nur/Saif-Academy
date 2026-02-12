import Loading from "@/components/ui/Loading";

export default function DashboardLoading() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Loading fullPage={false} />
        </div>
    );
}
