import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRef } from 'react'
import * as API from '@/constants/API'
import { toast } from '@/hooks/use-toast'

export default function CreateAccount() {
  const nameRef = useRef('')
  const nicknameRef = useRef('')
  const pwRef = useRef('')
  const loginIdRef = useRef('')
  const loginPwRef = useRef('')

  async function signup() {
    const request = {
      user_id: nameRef?.current?.value,
      user_pw: pwRef?.current?.value,
      user_nickname: nicknameRef?.current?.value,
    }

    console.log(request)

    await fetch(`${API.MAIN_DOMAIN + API.PATH_USER_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    }).then((res) => {
      if (res.status >= 300) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: '계정 생성 실패! 잠시 후 다시 시도해 주세요.',
        })
      } else {
        toast({
          title: '성공!',
          description: '계정이 생성되었습니다.',
        })
      }
    })
  }

  async function login() {
    const request = {
      user_id: loginIdRef?.current?.value,
      user_pw: loginPwRef?.current?.value,
    }

    console.log(request)

    await fetch(`${API.MAIN_DOMAIN + API.PATH_USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (res.status >= 300) {
          toast({
            variant: 'destructive',
            title: 'Error!',
            description: '로그인 실패',
          })
        } else {
          toast({
            title: '로그인 성공!',
            description: '환영합니다.',
          })
        }
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('loginStatus', JSON.stringify(data))
      })
  }

  return (
    <>
      <div className='ml-[32px] w-3/5'>
        <div className='flex-cols items-center justify-between'>
          <h1>Log in/Sign up</h1>
          <Tabs defaultValue='login' className='w-[400px]'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='login'>Log In</TabsTrigger>
              <TabsTrigger value='signup'>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
              <Card>
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                  <CardDescription>Log in for this website.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-1'>
                    <Label htmlFor='username'>Username</Label>
                    <Input id='username' placeholder='username' ref={loginIdRef} />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='password'>Password</Label>
                    <Input id='password' placeholder='password' ref={loginPwRef} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => login()}>Log In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value='signup'>
              <Card>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Make account for this web site.</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-1'>
                    <Label htmlFor='current'>Username</Label>
                    <Input id='username' ref={nameRef} placeholder='username' />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='new'>Nickname</Label>
                    <Input id='nickname' ref={nicknameRef} placeholder='joker' />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='new'>Password</Label>
                    <Input id='password' ref={pwRef} type='password' />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => signup()}>Create Account</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
