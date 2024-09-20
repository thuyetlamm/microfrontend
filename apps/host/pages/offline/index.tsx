import {cn} from "@repo/ui/lib/utils.ts";
import OfflineSection from "@/pages/offline/_component/offline-section.tsx";

interface IndexProps {
}

const Offline = ({} :IndexProps) => {
return (
<div className={cn('w-full,h-screen')}>
    <OfflineSection />
</div>
)
}

export default Offline