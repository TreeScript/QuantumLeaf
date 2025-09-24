import Header from "@/components/ui/layout/Header"
import Footer from "@/components/ui/layout/Footer"
import SessionGate from "@/components/auth/gate/SessionGate"
import NotificationBar from "@/components/notification/bar/NotificationBar"
import HeaderNotificationBar from "@/components/notification/bar/HeaderNotificationBar"
import Sidebar from "@/components/ui/layout/sidebar/Sidebar"
import SidebarToggleButton from "@/components/ui/layout/sidebar/SidebarToggleButton"

export default async function MainLayout({
  children,
}:{
  children: React.ReactNode;
}) {

  return (
    <SessionGate>
      <div className="flex h-screen">
        {/* 사이드바 */}
        <Sidebar />
        
        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <HeaderNotificationBar />
          <NotificationBar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* 모바일 사이드바 토글 버튼 */}
        <SidebarToggleButton />
      </div>
    </SessionGate>
  )
}