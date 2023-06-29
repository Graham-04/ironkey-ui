// import { redirect } from "@sveltejs/kit";
// export const handle: Handle = async ({ event, resolve }) => {
//   const hasJwt = event.cookies.get("hasJwt");
//   const authRoutes = ["/users"];
//   console.log("running hook");
//   if (authRoutes.includes(event.url.pathname)) {
//     console.log("protected route: ", event.cookies.get("hasJwt"), event.url.pathname);
//     if (hasJwt !== "true") {
//       console.log("redirecting");
//       throw redirect(303, "/");
//     }
//   }

//   const response = await resolve(event);
//   return response;
// };
