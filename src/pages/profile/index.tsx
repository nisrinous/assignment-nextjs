import { CgProfile } from "react-icons/cg";

export default function Profile() {
  return (
    <>
      <div className="w-screen p-10 bg-white">
        <div className="my-10 flex-col text-left">
          <h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl">
            Profile
          </h1>
          <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-5">
            Manage your profile
          </p>
        </div>
        <div className="flex flex-col gap-5 mb-10">
          <div>
            <div className="my-2">
              <CgProfile size={70} />
            </div>
            <h3>@Username</h3>
          </div>

          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b pb-1">
              Account Name
            </p>
            <p className="text-muted-foreground">Full name</p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b pb-1">
              E-mail
            </p>
            <p className="text-muted-foreground">E-mail</p>
          </div>
          <div>
            <p className="leading-tight sm:text-lg sm:leading-8 border-b pb-1">
              Membership
            </p>
            <p className="text-muted-foreground">Member</p>
            <p className="text-muted-foreground">Expire Date: </p>
          </div>
          <div>
            <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-1">
              Address
            </p>
            <p>Address</p>
          </div>
          <div>
            <p className="leading-tight text-muted-foreground sm:text-lg sm:leading-8 border-b pb-1">
              Phone Number
            </p>
            <p>Address</p>
          </div>
        </div>
      </div>
    </>
  );
}
