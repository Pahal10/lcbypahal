import { Dumbbell, Leaf, MessageCircle, Users, Menu, Heart, CircleCheck, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { useT } from "@/lib/i18n";

export function AppPhone({ screen, className = "" }: { screen: "gym" | "task" | "people" | "help"; className?: string }) {
  const t = useT();
  return (
    <div className={`app-phone ${className}`} aria-label={t("Let's Connect app preview")}>
      <div className={`app-phone-screen ${screen === "task" ? "app-phone-light" : ""}`}>
        <div className="phone-status"><span>9:41</span><span>••• ▰</span></div>
        <div className="phone-top"><img src={logo.url} alt="LC" /><Menu size={13} /></div>
        {screen === "gym" && <>
          <h3>{t("Conversation Gym")}</h3><p>{t("Build your social muscle.")}</p>
          <div className="phone-panel"><span>{t("Your journey")}</span><div className="phone-progress" /><p>{t("Start with your first exercise.")}</p></div>
          <h4>{t("Explore skills")}</h4>
          {["The first hello", "Keeping it going", "The compliment"].map((s, i) => <div className="phone-list" key={s}><span className="phone-number">0{i + 1}</span><span>{t(s)}</span><ArrowUpRight size={12} /></div>)}
        </>}
        {screen === "task" && <>
          <h3 className="phone-stage">{t("Small Talk")}</h3>
          <div className="phone-task"><img src={logo.url} alt="LC" /><div className="phone-insight"><b>{t("A little nudge")}</b><p>{t("People enjoy conversations more than they expect.")}</p></div><h4>{t("Ask someone what the time is")}</h4><span className="phone-action">{t("Done")}</span><span className="phone-action">{t("Another task")}</span></div>
        </>}
        {screen === "people" && <>
          <h3>{t("Your people.")}</h3><p>{t("Count connections, grow a little.")}</p>
          <div className="phone-panel phone-person"><span>{t("A connection for today")}</span><div className="phone-person-name"><CircleCheck size={18} /><b>Alex</b></div><p>{t("You started with a hello. Ready for a deeper conversation?")}</p><span className="phone-action">{t("Connect again")}</span></div>
          <h4>{t("Your connections")}</h4>{["Alex", "Sam"].map(n => <div className="phone-list" key={n}><Users size={16} /><span>{n}<small>{t("Small Talk")}</small></span><ArrowUpRight size={12} /></div>)}
        </>}
        {screen === "help" && <>
          <span className="phone-eyebrow">{t("Quick help")}</span><h3>{t("Not sure what to say next?")}</h3><p>{t("A little nudge for awkward moments.")}</p>
          <div className="phone-help-grid">{[{ icon: MessageCircle, label: "Start a conversation" }, { icon: Heart, label: "Exit gracefully" }, { icon: CircleCheck, label: "Handle awkward silence" }, { icon: Users, label: "Join a group" }].map(({ icon: Icon, label }) => <div key={label}><Icon size={20} /><span>{t(label)}</span></div>)}</div>
        </>}
        <div className="phone-bottom"><MessageCircle size={13} /><Users size={13} /><Leaf size={13} /><Dumbbell size={13} /></div>
      </div>
    </div>
  );
}