**Use the HOC in your pages:**
```typescript
import withAuthentication from '../../lib/withAuthentication';

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export default withAuthentication(ProtectedPage);
```



### Configure Default Login Routes via API
Use Axios to configure the default login routes as described in the documentation.

**Create a script or API route to configure the login URI:**
```typescript
import axios from 'axios';

const configureAuth0 = async () => {
  const options = {
    method: 'PATCH',
    url: `https://dev-o2yp8ppjqv8zsol1.us.auth0.com/api/v2/clients/${process.env.AUTH0_CLIENT_ID}`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.AUTH0_API_TOKEN}`,
      'cache-control': 'no-cache'
    },
    data: { initiate_login_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/login` }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

configureAuth0();
```

### Environment Variables
Ensure that you set the required environment variables in your `.env.local` file:
```env
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_BASE_URL=https://your-deployed-app.com
AUTH0_API_TOKEN=your-auth0-api-token
```

