import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Form,Button,Container,Row,Col,Alert } from 'react-bootstrap';

const LoginPage = () => {
    const [loginId,setLoginId] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const { login,isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if user is already logged in
        if (isLoggedIn) {
            router.push('/');
        }
    },[isLoggedIn,router]);

    const handleLogin = () => {
        // Perform authentication logic here
        // For simplicity, let's assume some predefined admin and employee login details

        if (loginId === 'admin' && password === 'admin') {
            login('admin');
            router.push('/');
        } else if (loginId === 'employee' && password === 'employee') {
            login('employee');
            router.push('/');
        } else {
            setError('Invalid login credentials');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Login Page</h2>
                    <Form>
                        <Form.Group controlId="loginId">
                            <Form.Label>Login ID:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your login ID"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>

                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
