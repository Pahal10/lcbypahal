export type PagePath = "/" | "/pricing" | "/register" | "/terms" | "/refund" | "/success" | "/verify" | "/offer" | "/auth/callback";

export const PAGE_PATHS: PagePath[] = ["/", "/register", "/pricing", "/offer", "/verify", "/terms", "/refund", "/success"];

type Meta = { title: string; description: string };

export const PAGE_META: Record<PagePath, Record<"en" | "pt" | "es", Meta>> = {
  "/auth/callback": {
    en: { title: "Finishing sign-in — Let's Connect", description: "Complete your Let's Connect sign-in and choose your username." },
    pt: { title: "Concluindo o acesso — Let's Connect", description: "Conclua seu acesso ao Let's Connect e escolha seu nome de usuário." },
    es: { title: "Completando el acceso — Let's Connect", description: "Completa tu acceso a Let's Connect y elige tu nombre de usuario." },
  },
  "/": {
    en: {
      title: "Let's Connect — Make Friends & Beat Loneliness | Social Anxiety Support App",
      description:
        "Make friends as an adult with guided real-world prompts. Social anxiety help and gentle nudges that help you feel less lonely, one conversation at a time.",
    },
    pt: {
      title: "Let's Connect — Faça amigos e vença a solidão",
      description:
        "Faça amigos na vida adulta com desafios guiados no mundo real. Ajuda para a ansiedade social e empurrõezinhos para você se sentir menos sozinho.",
    },
    es: {
      title: "Let's Connect — Haz amigos y vence la soledad",
      description:
        "Haz amigos de adulto con retos guiados en el mundo real. Ayuda para la ansiedad social y pequeños empujones para que te sientas menos solo.",
    },
  },
  "/register": {
    en: { title: "Create your account — Let's Connect", description: "Sign up for Let's Connect and start making friends with guided prompts built for social anxiety." },
    pt: { title: "Crie sua conta — Let's Connect", description: "Cadastre-se no Let's Connect e comece a fazer amigos com desafios guiados pensados para a ansiedade social." },
    es: { title: "Crea tu cuenta — Let's Connect", description: "Regístrate en Let's Connect y empieza a hacer amigos con retos guiados pensados para la ansiedad social." },
  },
  "/pricing": {
    en: { title: "Premium — Let's Connect", description: "Unlock premium rewards, hidden online hacks and discounts for $1/month." },
    pt: { title: "Premium — Let's Connect", description: "Desbloqueie recompensas premium, truques escondidos da internet e descontos por US$ 1/mês." },
    es: { title: "Premium — Let's Connect", description: "Desbloquea recompensas premium, trucos ocultos de internet y descuentos por US$1 al mes." },
  },
  "/offer": {
    en: { title: "Pick your plan — Let's Connect", description: "Continue free or unlock Let's Connect Premium rewards, hidden hacks and discounts for $1/month." },
    pt: { title: "Escolha seu plano — Let's Connect", description: "Continue grátis ou desbloqueie as recompensas, truques e descontos do Let's Connect Premium por US$ 1/mês." },
    es: { title: "Elige tu plan — Let's Connect", description: "Sigue gratis o desbloquea las recompensas, trucos y descuentos de Let's Connect Premium por US$1 al mes." },
  },
  "/verify": {
    en: { title: "Verify a Connection — Let's Connect", description: "Verify a real-world meetup with a friend to unlock rewards on Let's Connect." },
    pt: { title: "Verifique uma conexão — Let's Connect", description: "Confirme um encontro na vida real com um amigo para desbloquear recompensas no Let's Connect." },
    es: { title: "Verifica una conexión — Let's Connect", description: "Confirma un encuentro en la vida real con un amigo para desbloquear recompensas en Let's Connect." },
  },
  "/terms": {
    en: { title: "Terms of Service — Let's Connect", description: "Terms of service for Let's Connect, the app that helps you make friends and feel less lonely." },
    pt: { title: "Termos de Serviço — Let's Connect", description: "Termos de serviço do Let's Connect, o app que ajuda você a fazer amigos e se sentir menos sozinho." },
    es: { title: "Términos del Servicio — Let's Connect", description: "Términos del servicio de Let's Connect, la app que te ayuda a hacer amigos y sentirte menos solo." },
  },
  "/refund": {
    en: { title: "Refund Policy — Let's Connect", description: "Refund policy for Let's Connect Premium subscriptions — cancel anytime, payments are non-refundable." },
    pt: { title: "Política de Reembolso — Let's Connect", description: "Política de reembolso das assinaturas Let's Connect Premium: cancele quando quiser; os pagamentos não são reembolsáveis." },
    es: { title: "Política de Reembolso — Let's Connect", description: "Política de reembolso de Let's Connect Premium: cancela cuando quieras; los pagos no son reembolsables." },
  },
  "/success": {
    en: { title: "You're in — Let's Connect", description: "Your Let's Connect account is ready. Download the app and sign in to start connecting." },
    pt: { title: "Tudo pronto — Let's Connect", description: "Sua conta do Let's Connect está pronta. Baixe o app e entre para começar a se conectar." },
    es: { title: "¡Ya estás dentro! — Let's Connect", description: "Tu cuenta de Let's Connect está lista. Descarga la app e inicia sesión para empezar a conectar." },
  },
};
