import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Shield, Github } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();

  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

  return (
    <PageWrapper>
      <LoginBox>
        <TitelWrapper>
          <EventIcon>EF</EventIcon>
          <GraphiteWord> Event Finder</GraphiteWord>
        </TitelWrapper>

        {session ? (
          <>
            <Message>Signed in as {session.user.email}</Message>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            <Message>{isPreview ? "Preview" : "Choose a login method"}</Message>

            {isPreview ? (
              <ButtonsWrapper>
                <Button onClick={() => signIn(undefined, { callbackUrl: "/" })}>
                  <ButtonText>Login</ButtonText>
                </Button>
              </ButtonsWrapper>
            ) : (
              <ButtonsWrapper>
                <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
                  <Image
                    src="/google.png"
                    alt="google icon"
                    width={20}
                    height={20}
                  />
                  <ButtonText>Continue with Google</ButtonText>
                </Button>

                <SecondaryButton
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                  <Github size="20" />
                  <ButtonText>Continue with GitHub</ButtonText>
                </SecondaryButton>
              </ButtonsWrapper>
            )}
          </>
        )}

        <SecureBlock>
          <SecureTextWrapper>
            <SecureTitle>
              &nbsp; <Shield size={15} />
              &nbsp;Secure Login
            </SecureTitle>
          </SecureTextWrapper>
        </SecureBlock>
      </LoginBox>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--search-input-bg);
`;

const LoginBox = styled.div`
  background: var(--white-color);
  padding: 40px 50px;
  border-radius: 16px;
  box-shadow: var(--sidebar-shadow);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const EventIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: var(--hero-gradient);
  color: var(--white-color);
  padding: 5px;
  font-size: 18px;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const TitelWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
`;

const GraphiteWord = styled.span`
  color: var(--main-color);
  font-weight: 700;
  font-size: 26px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  color: var(--message-color);
`;

const Button = styled.button`
  background: var(--main-hover-color);
  color: var(--white-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    background: var(--main-color);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SecondaryButton = styled.button`
  background: var(--secondary-button-bg);
  color: var(--white-color);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  padding: 12px 25px;
  border-radius: 12px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--button-shadow);
  }
`;

const ButtonText = styled.p`
  margin: 0;
`;

const SecureBlock = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: var(--category-button-bg);
  padding: 8px 18px;
  border-radius: 16px;
  border: 1px solid var(--no-results-bg);
  color: var(--main-hover-color);
`;

const SecureTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecureTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
`;
