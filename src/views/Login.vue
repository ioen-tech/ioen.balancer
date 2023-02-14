<template>
  <div class="container">
    <h1>Login to Nanogrid</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form>
          <div class="mb-3">
            <input
              type="username"
              class="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <div class="mb-3 form-check">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>