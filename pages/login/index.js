import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Shield, Github } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <PageWrapper>
      <LoginBox>
        <Title>
          🎫 <GradientWord>Event</GradientWord>{" "}
          <GraphiteWord>Finder</GraphiteWord>
        </Title>

        {session ? (
          <>
            <Message>Signed in as {session.user.email}</Message>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <>
            <Message>Choose a login method</Message>

            <ButtonsWrapper>
              <Button onClick={() => signIn("google")}>
                <Image
                  width="20"
                  height="20"
                  src="/google.png"
                  alt="Google icon"
                />
                <ButtonText>Continue with Google</ButtonText>
              </Button>

              <SecondaryButton onClick={() => signIn("github")}>
                <Github size="20" />
                <ButtonText>Continue with GitHub</ButtonText>
              </SecondaryButton>
            </ButtonsWrapper>
          </>
        )}

        <SecureBlock>
          <SecureTextWrapper>
            <SecureTitle>
              &nbsp; <Shield size={15} />
              &nbsp;Secure Login
            </SecureTitle>
            <SecureDescription>
              Your credentials are protected with end-to-end encryption
            </SecureDescription>
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
  background: #f7f7f7;
`;

const LoginBox = styled.div`
  background: #fff;
  padding: 40px 50px;
  border-radius: 16px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const GradientWord = styled.span`
  background: linear-gradient(90deg, #b23cfb, #d147ff, #fb39ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GraphiteWord = styled.span`
  color: #3a3a3a;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 25px;
  color: #3a3a3a;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #b23cfb, #d147ff, #fb39ee);
  color: #fff;
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
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SecondaryButton = styled.button`
  background: #24292e;
  color: #fff;
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
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonText = styled.p`
  margin: 0;
`;

const SecureBlock = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f7ff;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid #dbe3ff;
  color: #1d4ed8;
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

const SecureDescription = styled.div`
  font-size: 13px;
  color: #3b82f6;
`;
