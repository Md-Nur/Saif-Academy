import Loading from "@/components/ui/Loading";

export default function BatchesLoading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <Loading fullPage={false} />
        </div>
    );
}
